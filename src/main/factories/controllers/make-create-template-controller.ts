import { ZodValidator } from "../../../infrastructure/adapters/zod-adapter";
import { createTemplateSchema } from "../../../infrastructure/schemas/requests/create-template-schema";

import { CreateTemplateController } from "../../../presentation/controllers/create-template-controller";
import { IController } from "../../../presentation/protocols/controller";
import { makeControllerAuthDecorator } from "../decorators/make-controller-auth-decorator";
import { makeControllerErrorDecorator } from "../decorators/make-controller-error-decorator";
import { makeCreateTemplateUseCase } from "../usecases/make-create-template-use-case";

export function makeCreateTemplateController(): IController {
  const validator = new ZodValidator(createTemplateSchema);
  const useCase = makeCreateTemplateUseCase();
  const controller = new CreateTemplateController(useCase, validator);
  return makeControllerErrorDecorator(makeControllerAuthDecorator(controller));
}
