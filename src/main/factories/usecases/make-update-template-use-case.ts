import { UpdateTemplateUseCase } from "../../../application/use-cases/update-template-use-case";
import { makeUnitOfWork } from "../repositories/make-unit-of-work";

export function makeUpdateTemplateUseCase() {
  const unitOfWork = makeUnitOfWork();
  return new UpdateTemplateUseCase(unitOfWork);
}
