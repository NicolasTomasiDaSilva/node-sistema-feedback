import { GetTemplatesController } from "../../../presentation/controllers/get-templates-controller";
import { IController } from "../../../presentation/protocols/controller";
import { makeControllerAuthDecorator } from "../decorators/make-controller-auth-decorator";
import { makeControllerErrorDecorator } from "../decorators/make-controller-error-decorator";
import { makeGetTemplatesUseCase } from "../usecases/make-get-templates-use-case";

export function makeGetTemplatesController(): IController {
  const useCase = makeGetTemplatesUseCase();
  const controller = new GetTemplatesController(useCase, {} as any);
  return makeControllerErrorDecorator(makeControllerAuthDecorator(controller));
}
