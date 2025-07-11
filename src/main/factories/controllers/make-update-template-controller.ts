import { ZodValidator } from "../../../infrastructure/adapters/zod-adapter";
import { updateTemplateSchema } from "../../../infrastructure/schemas/update-template-schema";
import { UpdateTemplateController } from "../../../presentation/controllers/update-template-controller";
import { IController } from "../../../presentation/protocols/controller";
import { makeControllerAuthDecorator } from "../decorators/make-controller-auth-decorator";
import { makeControllerErrorDecorator } from "../decorators/make-controller-error-decorator";
import { makeUpdateTemplateUseCase } from "../usecases/make-update-template-use-case";

export function makeUpdateTemplateController(): IController {
  const validator = new ZodValidator(updateTemplateSchema);
  const useCase = makeUpdateTemplateUseCase();
  const controller = new UpdateTemplateController(useCase, validator);
  return makeControllerErrorDecorator(makeControllerAuthDecorator(controller));
}
