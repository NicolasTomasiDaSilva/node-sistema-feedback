import { InviteUserController } from "../../../presentation/controllers/invite-user-controller";
import { IController } from "../../../presentation/protocols/controller";
import { makeControllerErrorDecorator } from "../decorators/make-controller-error";
import { makeInviteUserUseCase } from "../usecases/make-invite-user-use-case";

export function makeInviteUserController(): IController {
  const controller = new InviteUserController(makeInviteUserUseCase());
  return makeControllerErrorDecorator(controller);
}
