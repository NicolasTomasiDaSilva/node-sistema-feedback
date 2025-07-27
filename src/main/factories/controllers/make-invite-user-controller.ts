import { ZodValidator } from "../../../infrastructure/adapters/zod-adapter";
import { createInviteUserSchema } from "../../../infrastructure/schemas/requests/create-invite-user-schema";
import { CreateInviteUserController } from "../../../presentation/controllers/create-invite-user-controller";
import { IController } from "../../../presentation/protocols/controller";
import { makeControllerAuthDecorator } from "../decorators/make-controller-auth-decorator";
import { makeControllerErrorDecorator } from "../decorators/make-controller-error-decorator";
import { makeCreateInviteUserUseCase } from "../usecases/make-invite-user-use-case";

export function makeCreateInviteUserController(): IController {
  const validator = new ZodValidator(createInviteUserSchema);
  const useCase = makeCreateInviteUserUseCase();
  const controller = new CreateInviteUserController(useCase, validator);
  return makeControllerErrorDecorator(makeControllerAuthDecorator(controller));
}
