import { ICreateFeedbackUseCase } from "../../../application/protocols/use-cases/create-feedback-use-case";
import { CreateFeedbackUseCase } from "../../../application/use-cases/create-feedback-use-case";
import { UuidAdapter } from "../../../infrastructure/adapters/uuid-adapter";
import { makeUnitOfWork } from "../repositories/make-unit-of-work";

export function makeCreateFeedbackUseCase(): ICreateFeedbackUseCase {
  const uuidAdapter = new UuidAdapter();
  const unitOfWork = makeUnitOfWork();
  return new CreateFeedbackUseCase(unitOfWork, uuidAdapter);
}
