import { IInviteUserUseCase } from "../../../application/protocols/use-cases/invite-user-use-case";
import { InviteUserUseCase } from "../../../application/use-cases/invite-user-use-case";

import { UuidAdapter } from "../../../infrastructure/adapters/uuid-adapter";

import { makeInviteUserRepository } from "../repositories/make-invite-user-repository";

export function makeInviteUserUseCase(): IInviteUserUseCase {
  const uuidAdapter = new UuidAdapter();
  return new InviteUserUseCase(makeInviteUserRepository(), uuidAdapter);
}
