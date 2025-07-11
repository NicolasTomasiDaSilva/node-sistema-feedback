import { ZodValidator } from "../../../infrastructure/adapters/zod-adapter";
import { inviteUserSchema } from "../../../infrastructure/schemas/invite-user-schema";
import { InviteUserController } from "../../../presentation/controllers/invite-user-controller";
import { IController } from "../../../presentation/protocols/controller";
import { makeControllerAuthDecorator } from "../decorators/make-controller-auth-decorator";
import { makeControllerErrorDecorator } from "../decorators/make-controller-error-decorator";
import { makeInviteUserUseCase } from "../usecases/make-invite-user-use-case";

export function makeInviteUserController(): IController {
  const validator = new ZodValidator(inviteUserSchema);
  const useCase = makeInviteUserUseCase();
  const controller = new InviteUserController(useCase, validator);
  return makeControllerErrorDecorator(makeControllerAuthDecorator(controller));
}
