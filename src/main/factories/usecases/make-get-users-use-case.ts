import { IGetUsersUseCase } from "../../../application/protocols/use-cases/get-users-use-case";
import { GetUsersUseCase } from "../../../application/use-cases/get-users-use-case";
import { makeUnitOfWork } from "../repositories/make-unit-of-work";

export function makeGetUsersUseCase(): IGetUsersUseCase {
  const unitOfWork = makeUnitOfWork();
  return new GetUsersUseCase(unitOfWork);
}
