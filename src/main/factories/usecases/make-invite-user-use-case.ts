import { IInviteUserUseCase } from "../../../application/protocols/use-cases/invite-user-use-case";
import { InviteUserUseCase } from "../../../application/use-cases/invite-user-use-case";
import { InviteUserController } from "../../../presentation/controllers/invite-user-controller";

export function makeInviteUserUseCase(): IInviteUserUseCase {
  return new InviteUserUseCase();
}
