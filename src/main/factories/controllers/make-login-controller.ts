import { LoginController } from "../../../presentation/controllers/login-controller";
import { IController } from "../../../presentation/protocols/controller";
import { makeControllerErrorDecorator } from "../decorators/make-controller-error";
import { makeLoginUseCase } from "../usecases/make-login-use-case";

export function makeLoginController(): IController {
  const controller = new LoginController(makeLoginUseCase());
  return makeControllerErrorDecorator(controller);
}
