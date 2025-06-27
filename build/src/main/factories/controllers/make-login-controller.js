"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLoginController = makeLoginController;
const login_controller_1 = require("../../../presentation/controllers/login-controller");
const make_controller_error_decorator_1 = require("../decorators/make-controller-error-decorator");
const make_login_use_case_1 = require("../usecases/make-login-use-case");
function makeLoginController() {
    const controller = new login_controller_1.LoginController((0, make_login_use_case_1.makeLoginUseCase)());
    return (0, make_controller_error_decorator_1.makeControllerErrorDecorator)(controller);
}
