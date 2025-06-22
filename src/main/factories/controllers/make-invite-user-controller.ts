import { InviteUserController } from "../../../presentation/controllers/invite-user-controller";
import { makeInviteUserUseCase } from "../usecases/make-invite-user-use-case";

export function makeInviteUserController(): InviteUserController {
  return new InviteUserController(makeInviteUserUseCase());
}
