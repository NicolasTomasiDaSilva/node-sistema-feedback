import { Feedback } from "../../domain/entities/feedback";
import { FeedbackItem } from "../../domain/entities/feedback-item";
import { Invitation } from "../../domain/entities/invitation";
import { RoleEnum } from "../../domain/enums/role-enum";
import { BadRequestError, ForbiddenError } from "../../domain/errors/errors";
import { CreateFeedbackDTO } from "../dtos/feedback/create-feedback-dto";
import { IFeedbackRepository } from "../protocols/repositories/feedback-repository";
import { ICreateFeedbackUseCase } from "../protocols/use-cases/create-feedback-use-case";

import { IUuidGenerator } from "../protocols/uuid-generator";

export class CreateFeedbackUseCase implements ICreateFeedbackUseCase {
  constructor(
    private readonly FeedbackRepository: IFeedbackRepository,
    private readonly uuidGenerator: IUuidGenerator
  ) {}
  execute(data: CreateFeedbackDTO): Promise<Feedback> {
    if (
      data.currentUser.role !== RoleEnum.manager &&
      data.currentUser.role !== RoleEnum.supervisor
    ) {
      throw new ForbiddenError(
        "Only managers and supervisors can create Feedbacks"
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
          id: this.uuidGenerator.generate(),
          feedbackId: feedbackId,
          label: item.label,
          description: item.description,
          observation: item.observation,
          score: item.score,
          weight: item.weight,
          order: item.order,
        });
      }),
    });

    return this.FeedbackRepository.create(feedback);
  }
}
