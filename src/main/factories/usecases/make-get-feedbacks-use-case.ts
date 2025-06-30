import { IGetFeedbacksUseCase } from "../../../application/protocols/use-cases/get-feedbacks-use-case";
import { GetFeedbacksUseCase } from "../../../application/use-cases/get-feedbacks-use-case";
import { makeFeedbackRepository } from "../repositories/make-feedback-repository";

export function makeGetFeedbacksUseCase(): IGetFeedbacksUseCase {
  return new GetFeedbacksUseCase(makeFeedbackRepository());
}
