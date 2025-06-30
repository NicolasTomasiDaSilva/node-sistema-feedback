import { Feedback } from "../../domain/entities/feedback";
import { GetFeedbacksDTO } from "../dtos/get-feedbacks-dto";
import { IFeedbackRepository } from "../protocols/repositories/feedback-repository";
import { IGetFeedbacksUseCase } from "../protocols/use-cases/get-feedbacks-use-case";

export class GetFeedbacksUseCase implements IGetFeedbacksUseCase {
  constructor(private readonly feedbackRepository: IFeedbackRepository) {}

  execute(data: GetFeedbacksDTO): Promise<Feedback[]> {
    const { currentUser, page, perPage } = data;

    return this.feedbackRepository.findManyByRole(
      currentUser.companyId,
      currentUser.id,
      currentUser.role,
      page ? page : 1,
      perPage ? perPage : 5
    );
  }
}
