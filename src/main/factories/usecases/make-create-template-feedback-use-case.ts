import { ICreateTemplateFeedbackUseCase } from "../../../application/protocols/use-cases/create-template-feedback-use-case";
import { CreateTemplateFeedbackUseCase } from "../../../application/use-cases/create-template-feedback-use-case";

import { UuidAdapter } from "../../../infrastructure/adapters/uuid-adapter";
import { makeTemplateFeedbackRepository } from "../repositories/make-template-feedback-repository";

export function makeCreateTemplateFeedbackUseCase(): ICreateTemplateFeedbackUseCase {
  const uuidAdapter = new UuidAdapter();
  return new CreateTemplateFeedbackUseCase(
    makeTemplateFeedbackRepository(),
    uuidAdapter
  );
}
