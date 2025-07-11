"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetUsersController = makeGetUsersController;
const zod_adapter_1 = require("../../../infrastructure/adapters/zod-adapter");
const get_users_schema_1 = require("../../../infrastructure/schemas/get-users-schema");
const get_users_controller_1 = require("../../../presentation/controllers/get-users-controller");
const make_controller_auth_decorator_1 = require("../decorators/make-controller-auth-decorator");
const make_controller_error_decorator_1 = require("../decorators/make-controller-error-decorator");
const make_get_users_use_case_1 = require("../usecases/make-get-users-use-case");
function makeGetUsersController() {
    const validator = new zod_adapter_1.ZodValidator(get_users_schema_1.getUsersSchema);
    const useCase = (0, make_get_users_use_case_1.makeGetUsersUseCase)();
    const controller = new get_users_controller_1.GetUsersController(useCase, validator);
    return (0, make_controller_error_decorator_1.makeControllerErrorDecorator)((0, make_controller_auth_decorator_1.makeControllerAuthDecorator)(controller));
}
//# sourceMappingURL=make-get-users-controller.js.map