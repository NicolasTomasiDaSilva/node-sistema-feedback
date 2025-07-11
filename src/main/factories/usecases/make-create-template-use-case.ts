import { ICreateTemplateUseCase } from "../../../application/protocols/use-cases/create-template-use-case";
import { CreateTemplateUseCase } from "../../../application/use-cases/create-template-use-case";
import { UuidAdapter } from "../../../infrastructure/adapters/uuid-adapter";
import { makeUnitOfWork } from "../repositories/make-unit-of-work";

export function makeCreateTemplateUseCase(): ICreateTemplateUseCase {
  const uuidAdapter = new UuidAdapter();
  const unitOfWork = makeUnitOfWork();
  return new CreateTemplateUseCase(unitOfWork, uuidAdapter);
}
