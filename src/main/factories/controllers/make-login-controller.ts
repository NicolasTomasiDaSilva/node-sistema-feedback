import { ZodValidator } from "../../../infrastructure/adapters/zod-adapter";
import { loginSchema } from "../../../infrastructure/schemas/loigin-schema";
import { LoginController } from "../../../presentation/controllers/login-controller";
import { IController } from "../../../presentation/protocols/controller";
import { makeControllerErrorDecorator } from "../decorators/make-controller-error-decorator";
import { makeLoginUseCase } from "../usecases/make-login-use-case";

export function makeLoginController(): IController {
  const validator = new ZodValidator(loginSchema);
  const useCase = makeLoginUseCase();
  const controller = new LoginController(useCase, validator);
  return makeControllerErrorDecorator(controller);
}
