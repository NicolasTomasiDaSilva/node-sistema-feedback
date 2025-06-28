"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLoginController = makeLoginController;
const zod_adapter_1 = require("../../../infrastructure/adapters/zod-adapter");
const login_schema_1 = require("../../../infrastructure/schemas/login-schema");
const login_controller_1 = require("../../../presentation/controllers/login-controller");
const make_controller_error_decorator_1 = require("../decorators/make-controller-error-decorator");
const make_login_use_case_1 = require("../usecases/make-login-use-case");
function makeLoginController() {
    const validator = new zod_adapter_1.ZodValidator(login_schema_1.loginSchema);
    const useCase = (0, make_login_use_case_1.makeLoginUseCase)();
    const controller = new login_controller_1.LoginController(useCase, validator);
    return (0, make_controller_error_decorator_1.makeControllerErrorDecorator)(controller);
}
