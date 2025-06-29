import { ICreateFeedbackUseCase } from "../../../application/protocols/use-cases/create-feedback-use-case";
import { CreateFeedbackUseCase } from "../../../application/use-cases/create-feedback-use-case";
import { UuidAdapter } from "../../../infrastructure/adapters/uuid-adapter";
import { makeFeedbackRepository } from "../repositories/make-feedback-repository";

export function makeCreateFeedbackUseCase(): ICreateFeedbackUseCase {
  const uuidAdapter = new UuidAdapter();
  return new CreateFeedbackUseCase(makeFeedbackRepository(), uuidAdapter);
}
