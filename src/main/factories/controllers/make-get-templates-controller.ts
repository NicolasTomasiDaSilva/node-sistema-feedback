import { ZodValidator } from "../../../infrastructure/adapters/zod-adapter";
import { getTemplatesSchema } from "../../../infrastructure/schemas/get-templates-schema";
import { GetTemplatesController } from "../../../presentation/controllers/get-templates-controller";
import { IController } from "../../../presentation/protocols/controller";
import { makeControllerAuthDecorator } from "../decorators/make-controller-auth-decorator";
import { makeControllerErrorDecorator } from "../decorators/make-controller-error-decorator";
import { makeGetTemplatesUseCase } from "../usecases/make-get-templates-use-case";

export function makeGetTemplatesController(): IController {
  const validator = new ZodValidator(getTemplatesSchema);
  const useCase = makeGetTemplatesUseCase();
  const controller = new GetTemplatesController(useCase, validator);
  return makeControllerErrorDecorator(makeControllerAuthDecorator(controller));
}
