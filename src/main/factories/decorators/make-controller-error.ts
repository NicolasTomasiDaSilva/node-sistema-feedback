import { ControllerErrorDecorator } from "../../../presentation/decorators/controller-error-decorator";
import { IController } from "../../../presentation/protocols/controller";

export function makeControllerErrorDecorator(
  controller: IController
): IController {
  return new ControllerErrorDecorator(controller);
}
