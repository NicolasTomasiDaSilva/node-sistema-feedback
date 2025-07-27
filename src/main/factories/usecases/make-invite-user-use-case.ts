import { ICreateInviteUserUseCase } from "../../../application/protocols/use-cases/create-invite-user-use-case";
import { CreateInviteUserUseCase } from "../../../application/use-cases/create-invite-user-use-case";
import { UuidAdapter } from "../../../infrastructure/adapters/uuid-adapter";
import { makeUnitOfWork } from "../repositories/make-unit-of-work";

export function makeCreateInviteUserUseCase(): ICreateInviteUserUseCase {
  const uuidAdapter = new UuidAdapter();
  const unitOfWork = makeUnitOfWork();
  return new CreateInviteUserUseCase(unitOfWork, uuidAdapter);
}
