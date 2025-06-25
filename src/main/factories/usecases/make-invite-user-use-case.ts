import { IInviteUserUseCase } from "../../../application/protocols/use-cases/invite-user-use-case";
import { InviteUserUseCase } from "../../../application/use-cases/invite-user-use-case";
import { InviteUserController } from "../../../presentation/controllers/invite-user-controller";
import { makeInviteUserRepository } from "../repositories/make-invite-user-repository";

export function makeInviteUserUseCase(): IInviteUserUseCase {
  return new InviteUserUseCase(makeInviteUserRepository());
}
