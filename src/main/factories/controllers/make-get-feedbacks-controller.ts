import { ZodValidator } from "../../../infrastructure/adapters/zod-adapter";
import { getFeedbacksSchema } from "../../../infrastructure/schemas/get-feedbacks-schema";
import { GetFeedbacksController } from "../../../presentation/controllers/get-feedbacks-controller";

import { IController } from "../../../presentation/protocols/controller";
import { makeControllerAuthDecorator } from "../decorators/make-controller-auth-decorator";
import { makeControllerErrorDecorator } from "../decorators/make-controller-error-decorator";
import { makeGetFeedbacksUseCase } from "../usecases/make-get-feedbacks-use-case";

export function makeGetFeedbacksController(): IController {
  const validator = new ZodValidator(getFeedbacksSchema);
  const useCase = makeGetFeedbacksUseCase();
  const controller = new GetFeedbacksController(useCase, validator);
  return makeControllerErrorDecorator(makeControllerAuthDecorator(controller));
}
