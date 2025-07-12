import { ZodValidator } from "../../../infrastructure/adapters/zod-adapter";
import { getTemplateSchema } from "../../../infrastructure/schemas/get-template-schema";
import { GetTemplateController } from "../../../presentation/controllers/get-template-controller";
import { IController } from "../../../presentation/protocols/controller";
import { makeControllerAuthDecorator } from "../decorators/make-controller-auth-decorator";
import { makeControllerErrorDecorator } from "../decorators/make-controller-error-decorator";
import { makeGetTemplateUseCase } from "../usecases/make-get-template-use-case";

export function makeGetTemplateController(): IController {
  const validator = new ZodValidator(getTemplateSchema);
  const useCase = makeGetTemplateUseCase();
  const controller = new GetTemplateController(useCase, validator);
  return makeControllerErrorDecorator(makeControllerAuthDecorator(controller));
}
