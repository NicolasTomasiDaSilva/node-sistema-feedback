import { ZodValidator } from "../../../infrastructure/adapters/zod-adapter";
import { getFeedbackSchema } from "../../../infrastructure/schemas/requests/get-feedback-schema";

import { GetFeedbackController } from "../../../presentation/controllers/get-feedback-controller";
import { IController } from "../../../presentation/protocols/controller";
import { makeControllerAuthDecorator } from "../decorators/make-controller-auth-decorator";
import { makeControllerErrorDecorator } from "../decorators/make-controller-error-decorator";
import { makeGetFeedbackUseCase } from "../usecases/make-get-feedback-use-case";

export function makeGetFeedbackController(): IController {
  const validator = new ZodValidator(getFeedbackSchema);
  const useCase = makeGetFeedbackUseCase();
  const controller = new GetFeedbackController(useCase, validator);
  return makeControllerErrorDecorator(makeControllerAuthDecorator(controller));
}
