import { IInviteUserUseCase } from "../../../application/protocols/use-cases/invite-user-use-case";
import { InviteUserUseCase } from "../../../application/use-cases/invite-user-use-case";
import { UuidAdapter } from "../../../infrastructure/adapters/uuid-adapter";
import { makeUnitOfWork } from "../repositories/make-unit-of-work";

export function makeInviteUserUseCase(): IInviteUserUseCase {
  const uuidAdapter = new UuidAdapter();
  const unitOfWork = makeUnitOfWork();
  return new InviteUserUseCase(unitOfWork, uuidAdapter);
}
