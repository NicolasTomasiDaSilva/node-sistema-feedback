import { RoleEnum } from "../../../domain/enums/role-enum";
import { ZodValidator } from "../../../infrastructure/adapters/zod-adapter";
import { createChecklistSchema } from "../../../infrastructure/schemas/create-checklist-schema";
import { CreateChecklistController } from "../../../presentation/controllers/create-checklist-controller";
import { IController } from "../../../presentation/protocols/controller";
import { makeControllerAuthDecorator } from "../decorators/make-controller-auth-decorator";
import { makeControllerErrorDecorator } from "../decorators/make-controller-error-decorator";
import { makeCreateChecklistUseCase } from "../usecases/make-create-checklist-use-case";

export function makeCreateChecklistController(): IController {
  const validator = new ZodValidator(createChecklistSchema);
  const useCase = makeCreateChecklistUseCase();
  const controller = new CreateChecklistController(useCase, validator);
  const requiredRoles: RoleEnum[] = [RoleEnum.manager];
  return makeControllerErrorDecorator(
    makeControllerAuthDecorator(controller, requiredRoles)
  );
}
