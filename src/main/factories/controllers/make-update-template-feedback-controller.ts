import { ZodValidator } from "../../../infrastructure/adapters/zod-adapter";
import { updateTemplateFeedbackSchema } from "../../../infrastructure/schemas/update-template-feedback-schema";
import { UpdateTemplateFeedbackController } from "../../../presentation/controllers/update-template-feedback-controller";
import { IController } from "../../../presentation/protocols/controller";
import { makeControllerAuthDecorator } from "../decorators/make-controller-auth-decorator";
import { makeControllerErrorDecorator } from "../decorators/make-controller-error-decorator";
import { makeUpdateTemplateFeedbackUseCase } from "../usecases/make-update-template-feedback-use-case";

export function makeUpdateTemplateFeedbackController(): IController {
  const validator = new ZodValidator(updateTemplateFeedbackSchema);
  const useCase = makeUpdateTemplateFeedbackUseCase();
  const controller = new UpdateTemplateFeedbackController(useCase, validator);
  return makeControllerErrorDecorator(makeControllerAuthDecorator(controller));
}
