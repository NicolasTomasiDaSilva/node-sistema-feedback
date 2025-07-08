import { IGetFeedbacksUseCase } from "../../../application/protocols/use-cases/get-feedbacks-use-case";
import { GetFeedbacksUseCase } from "../../../application/use-cases/get-feedbacks-use-case";
import { makeUnitOfWork } from "../repositories/make-unit-of-work";

export function makeGetFeedbacksUseCase(): IGetFeedbacksUseCase {
  const unitOfWork = makeUnitOfWork();
  return new GetFeedbacksUseCase(unitOfWork);
}
