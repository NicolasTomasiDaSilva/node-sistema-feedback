import { IGetFeedbackUseCase } from "../../../application/protocols/use-cases/get-feedback-use-case";
import { GetFeedbackUseCase } from "../../../application/use-cases/get-feedback-use-case";
import { makeUnitOfWork } from "../repositories/make-unit-of-work";

export const makeGetFeedbackUseCase = (): IGetFeedbackUseCase => {
  const unitOfWork = makeUnitOfWork();
  return new GetFeedbackUseCase(unitOfWork);
};
