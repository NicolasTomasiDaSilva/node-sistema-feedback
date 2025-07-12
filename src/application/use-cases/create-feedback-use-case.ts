import { Feedback } from "../../domain/entities/feedback";
import { FeedbackItem } from "../../domain/entities/feedback-item";
import { User } from "../../domain/entities/user";
import { RoleEnum } from "../../domain/enums/role-enum";
import { ForbiddenError, NotFoundError } from "../../domain/errors/errors";
import { CreateFeedbackDTO } from "../dtos/create-feedback-dto";
import { IUnitOfWork } from "../protocols/repositories/unit-of-work";
import { ICreateFeedbackUseCase } from "../protocols/use-cases/create-feedback-use-case";

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

    try {
      await this.unitOfWork.start();

      const giver: User | null = await this.unitOfWork
        .getUserRepository()
        .findById(data.currentUser.id, data.currentUser.companyId);

      if (!giver) {
        throw new NotFoundError("Giver not found");
      }

      const receiver: User | null = await this.unitOfWork
        .getUserRepository()
        .findById(data.receiverId, data.currentUser.companyId);

      if (!receiver) {
        throw new NotFoundError("Receiver not found");
      }

      if (giver.companyId !== receiver.companyId) {
        throw new ForbiddenError(
          "Giver and receiver must be from the same company"
        );
      }

      const feedbackId = this.uuidGenerator.generate();
      const feedback = Feedback.create({
        id: feedbackId,
        giver: giver,
        receiver: receiver,
        description: data.description,
        observation: data.observation,
        score: data.score,
        title: data.title,
        items: data.items.map((item) => {
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
