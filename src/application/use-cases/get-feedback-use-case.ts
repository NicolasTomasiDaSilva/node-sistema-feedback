import { Feedback } from "../../domain/entities/feedback";
import { RoleEnum } from "../../domain/enums/role-enum";
import { NotFoundError } from "../../domain/errors/errors";
import { GetFeedbackDTO } from "../dtos/get-feedback-dto";
import { IUnitOfWork } from "../protocols/repositories/unit-of-work";
import { IGetFeedbackUseCase } from "../protocols/use-cases/get-feedback-use-case";

export class GetFeedbackUseCase implements IGetFeedbackUseCase {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(data: GetFeedbackDTO): Promise<Feedback> {
    if (
      data.currentUser.role === RoleEnum.manager ||
      data.currentUser.role === RoleEnum.supervisor
    ) {
      const feedback = await this.unitOfWork
        .getFeedbackRepository()
        .findById(data.id, data.currentUser.companyId);

      if (!feedback) {
        throw new NotFoundError("Feedback not found");
      }

      return feedback;
    }

    const feedback = await this.unitOfWork
      .getFeedbackRepository()
      .findById(data.id, data.currentUser.companyId, data.currentUser.id);

    if (!feedback) {
      throw new NotFoundError("Feedback not found");
    }

    return feedback;
  }
}
