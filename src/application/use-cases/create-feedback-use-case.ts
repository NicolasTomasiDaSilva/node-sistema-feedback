import { Feedback } from "../../domain/entities/feedback";
import { FeedbackItem } from "../../domain/entities/feedback-item";
import { Invitation } from "../../domain/entities/invitation";
import { RoleEnum } from "../../domain/enums/role-enum";
import { BadRequestError, ForbiddenError } from "../../domain/errors/errors";
import { CreateFeedbackDTO } from "../dtos/create-feedback-dto";
import { IFeedbackRepository } from "../protocols/repositories/feedback-repository";
import { ICreateFeedbackUseCase } from "../protocols/use-cases/create-feedback-use-case";
import { IUnitOfWork } from "../protocols/repositories/unit-of-work";

import { IUuidGenerator } from "../protocols/uuid-generator";

export class CreateFeedbackUseCase implements ICreateFeedbackUseCase {
  constructor(
    private readonly unitOfWork: IUnitOfWork,
    private readonly uuidGenerator: IUuidGenerator
  ) {}

  async execute(data: CreateFeedbackDTO): Promise<Feedback> {
    const requiredRoles: RoleEnum[] = [RoleEnum.manager, RoleEnum.supervisor];
    if (!requiredRoles.includes(data.currentUser.role)) {
      throw new ForbiddenError(
        "Only managers and supervisors can create Feedback"
      );
    }

    if (!data.items.length) {
      throw new BadRequestError("Feedback must have at least one item");
    }

    const feedbackId = this.uuidGenerator.generate();

    const feedback = Feedback.create({
      id: feedbackId,
      giverId: data.currentUser.id,
      receiverId: data.receiverId,
      description: data.description,
      observation: data.observation,
      score: data.score,
      title: data.title,
      items: data.items.map((item) => {
        if (item.weight < 1 || item.weight > 5) {
          throw new BadRequestError("Weight must be between 1 and 5");
        }
        return FeedbackItem.create({
          label: item.label,
          description: item.description,
          observation: item.observation,
          score: item.score,
          weight: item.weight,
          order: item.order,
        });
      }),
    });

    try {
      await this.unitOfWork.start();

      const createdFeedback = await this.unitOfWork
        .getFeedbackRepository()
        .create(feedback, data.currentUser.companyId);

      await this.unitOfWork.commit();
      return createdFeedback;
    } catch (error) {
      await this.unitOfWork.rollback();
      throw error;
    }
  }
}
