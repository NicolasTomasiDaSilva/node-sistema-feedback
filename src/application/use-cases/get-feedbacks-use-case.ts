import { Feedback } from "../../domain/entities/feedback";
import { RoleEnum } from "../../domain/enums/role-enum";
import { GetFeedbacksDTO } from "../dtos/get-feedbacks-dto";
import { IFeedbackRepository } from "../protocols/repositories/feedback-repository";
import { IGetFeedbacksUseCase } from "../protocols/use-cases/get-feedbacks-use-case";

export class GetFeedbacksUseCase implements IGetFeedbacksUseCase {
  constructor(private readonly feedbackRepository: IFeedbackRepository) {}

  execute(data: GetFeedbacksDTO): Promise<Feedback[]> {
    const { currentUser, page, perPage } = data;
    if (
      currentUser.role === RoleEnum.manager ||
      currentUser.role === RoleEnum.supervisor
    ) {
      return this.feedbackRepository.find({
        companyId: currentUser.companyId,
        page: page ?? 1,
        perPage: perPage ?? 5,
      });
    }
    return this.feedbackRepository.find({
      companyId: currentUser.companyId,
      page: page ?? 1,
      perPage: perPage ?? 5,
      receiverId: currentUser.id,
    });
  }
}
