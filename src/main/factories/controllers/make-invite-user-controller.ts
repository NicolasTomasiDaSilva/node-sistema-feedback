import { RoleEnum } from "../../../domain/enums/role-enum";
import { ZodValidator } from "../../../infrastructure/adapters/zod-adapter";
import {
  InviteUserController,
  inviteUserSchema,
} from "../../../presentation/controllers/invite-user-controller";
import { IController } from "../../../presentation/protocols/controller";
import { makeControllerAuthDecorator } from "../decorators/make-controller-auth-decorator";
import { makeControllerErrorDecorator } from "../decorators/make-controller-error-decorator";
import { makeInviteUserUseCase } from "../usecases/make-invite-user-use-case";

export function makeInviteUserController(): IController {
  const validator = new ZodValidator(inviteUserSchema);
  const requiredRoles: RoleEnum[] = [RoleEnum.manager];
  const controller = new InviteUserController(
    makeInviteUserUseCase(),
    validator
  );
  return makeControllerErrorDecorator(
    makeControllerAuthDecorator(controller, requiredRoles)
  );
}
