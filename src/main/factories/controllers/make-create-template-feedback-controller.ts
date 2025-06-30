import { RoleEnum } from "../../../domain/enums/role-enum";
import { ZodValidator } from "../../../infrastructure/adapters/zod-adapter";
import {
  createFeedbackItemSchema,
  createFeedbackSchema,
} from "../../../infrastructure/schemas/create-feedback-schema";
import { createTemplateFeedbackSchema } from "../../../infrastructure/schemas/create-template-feedback-schema";
import { CreateTemplateFeedbackController } from "../../../presentation/controllers/create-template-feedback-controller";
import { IController } from "../../../presentation/protocols/controller";
import { makeControllerAuthDecorator } from "../decorators/make-controller-auth-decorator";
import { makeControllerErrorDecorator } from "../decorators/make-controller-error-decorator";
import { makeCreateTemplateFeedbackUseCase } from "../usecases/make-create-template-feedback-use-case";

export function makeCreateTemplateFeedbackController(): IController {
  const validator = new ZodValidator(createTemplateFeedbackSchema);
  const useCase = makeCreateTemplateFeedbackUseCase();
  const controller = new CreateTemplateFeedbackController(useCase, validator);
  const requiredRoles: RoleEnum[] = [RoleEnum.manager, RoleEnum.supervisor];
  return makeControllerErrorDecorator(
    makeControllerAuthDecorator(controller, requiredRoles)
  );
}
