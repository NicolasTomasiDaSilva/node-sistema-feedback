import { RoleEnum } from "../../../domain/enums/role-enum";
import { JwtTokenServiceAdapter } from "../../../infrastructure/adapters/jwt-token-service-adapter";
import { ControllerAuthDecorator } from "../../../presentation/decorators/controller-auth-decorator";
import { IController } from "../../../presentation/protocols/controller";

export function makeControllerAuthDecorator(
  controller: IController,
  roles: RoleEnum[]
): IController {
  const tokenAdapter = new JwtTokenServiceAdapter();
  return new ControllerAuthDecorator(tokenAdapter, controller, roles);
}
