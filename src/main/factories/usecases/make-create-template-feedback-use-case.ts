import { ICreateTemplateFeedbackUseCase } from "../../../application/protocols/use-cases/create-template-feedback-use-case";
import { CreateTemplateFeedbackUseCase } from "../../../application/use-cases/create-template-feedback-use-case";
import { UuidAdapter } from "../../../infrastructure/adapters/uuid-adapter";
import { makeUnitOfWork } from "../repositories/make-unit-of-work";

export function makeCreateTemplateFeedbackUseCase(): ICreateTemplateFeedbackUseCase {
  const uuidAdapter = new UuidAdapter();
  const unitOfWork = makeUnitOfWork();
  return new CreateTemplateFeedbackUseCase(unitOfWork, uuidAdapter);
}
