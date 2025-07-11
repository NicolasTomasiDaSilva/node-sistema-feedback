import { JwtTokenServiceAdapter } from "../../../infrastructure/adapters/jwt-token-service-adapter";
import { ControllerAuthDecorator } from "../../../presentation/decorators/controller-auth-decorator";
import { IController } from "../../../presentation/protocols/controller";

export function makeControllerAuthDecorator(
  controller: IController
): IController {
  const tokenAdapter = new JwtTokenServiceAdapter();
  return new ControllerAuthDecorator(tokenAdapter, controller);
}
