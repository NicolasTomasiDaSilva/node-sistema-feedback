import { ZodValidator } from "../../../infrastructure/adapters/zod-adapter";
import { createFeedbackSchema } from "../../../infrastructure/schemas/requests/create-feedback-schema";

import { CreateFeedbackController } from "../../../presentation/controllers/create-feedback-controller";
import { IController } from "../../../presentation/protocols/controller";
import { makeControllerAuthDecorator } from "../decorators/make-controller-auth-decorator";
import { makeControllerErrorDecorator } from "../decorators/make-controller-error-decorator";
import { makeCreateFeedbackUseCase } from "../usecases/make-create-feedback-use-case";

export function makeCreateFeedbackController(): IController {
  const validator = new ZodValidator(createFeedbackSchema);
  const useCase = makeCreateFeedbackUseCase();
  const controller = new CreateFeedbackController(useCase, validator);
  return makeControllerErrorDecorator(makeControllerAuthDecorator(controller));
}
