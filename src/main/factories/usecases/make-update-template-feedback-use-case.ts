import { UpdateTemplateFeedbackUseCase } from "../../../application/use-cases/update-template-feedback-use-case";
import { makeUnitOfWork } from "../repositories/make-unit-of-work";

export function makeUpdateTemplateFeedbackUseCase() {
  const unitOfWork = makeUnitOfWork();
  return new UpdateTemplateFeedbackUseCase(unitOfWork);
}
