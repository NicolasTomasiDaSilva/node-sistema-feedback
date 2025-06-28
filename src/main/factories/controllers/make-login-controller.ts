import { ZodValidator } from "../../../infrastructure/adapters/zod-adapter";
import {
  LoginController,
  loginSchema,
} from "../../../presentation/controllers/login-controller";
import { IController } from "../../../presentation/protocols/controller";
import { makeControllerErrorDecorator } from "../decorators/make-controller-error-decorator";
import { makeLoginUseCase } from "../usecases/make-login-use-case";

export function makeLoginController(): IController {
  const validator = new ZodValidator(loginSchema);
  const controller = new LoginController(makeLoginUseCase(), validator);
  return makeControllerErrorDecorator(controller);
}
