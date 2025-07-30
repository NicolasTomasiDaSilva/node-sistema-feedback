import { ZodValidator } from "../../../infrastructure/adapters/zod-adapter";
import { idSchema } from "../../../infrastructure/schemas/requests/id-schema";
import { updateTemplateSchema } from "../../../infrastructure/schemas/requests/update-template-schema";
import { UpdateTemplateController } from "../../../presentation/controllers/update-template-controller";
import { IController } from "../../../presentation/protocols/controller";
import { makeControllerAuthDecorator } from "../decorators/make-controller-auth-decorator";
import { makeControllerErrorDecorator } from "../decorators/make-controller-error-decorator";
import { makeUpdateTemplateUseCase } from "../usecases/make-update-template-use-case";

export function makeUpdateTemplateController(): IController {
  const bodyValidator = new ZodValidator(updateTemplateSchema);
  const paramsValidator = new ZodValidator(idSchema);
  const useCase = makeUpdateTemplateUseCase();
  const controller = new UpdateTemplateController(
    useCase,
    bodyValidator,
    paramsValidator
  );
  return makeControllerErrorDecorator(makeControllerAuthDecorator(controller));
}
