import { RoleEnum } from "../../../domain/enums/role-enum";
import { ZodValidator } from "../../../infrastructure/adapters/zod-adapter";
import { getUsersSchema } from "../../../infrastructure/schemas/get-users-schema";
import { GetUsersController } from "../../../presentation/controllers/get-users-controller";
import { IController } from "../../../presentation/protocols/controller";
import { makeControllerAuthDecorator } from "../decorators/make-controller-auth-decorator";
import { makeControllerErrorDecorator } from "../decorators/make-controller-error-decorator";
import { makeGetUsersUseCase } from "../usecases/make-get-users-use-case";

export function makeGetUsersController(): IController {
  const validator = new ZodValidator(getUsersSchema);
  const useCase = makeGetUsersUseCase();
  const controller = new GetUsersController(useCase, validator);
  const requiredRoles: RoleEnum[] = [RoleEnum.manager, RoleEnum.supervisor];
  return makeControllerErrorDecorator(
    makeControllerAuthDecorator(controller, requiredRoles)
  );
}
