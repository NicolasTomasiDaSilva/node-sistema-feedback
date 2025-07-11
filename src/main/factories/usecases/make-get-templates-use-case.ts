import { GetTemplatesUseCase } from "../../../application/use-cases/get-templates-use-case";
import { makeUnitOfWork } from "../repositories/make-unit-of-work";

export function makeGetTemplatesUseCase() {
  const unitOfWork = makeUnitOfWork();
  return new GetTemplatesUseCase(unitOfWork);
}
