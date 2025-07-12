import { GetTemplateUseCase } from "../../../application/use-cases/get-template-use-case";
import { makeUnitOfWork } from "../repositories/make-unit-of-work";

export const makeGetTemplateUseCase = (): GetTemplateUseCase => {
  const unitOfWork = makeUnitOfWork();
  return new GetTemplateUseCase(unitOfWork);
};
