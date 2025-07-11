"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetTemplatesController = makeGetTemplatesController;
const get_templates_controller_1 = require("../../../presentation/controllers/get-templates-controller");
const make_controller_auth_decorator_1 = require("../decorators/make-controller-auth-decorator");
const make_controller_error_decorator_1 = require("../decorators/make-controller-error-decorator");
const make_get_templates_use_case_1 = require("../usecases/make-get-templates-use-case");
function makeGetTemplatesController() {
    const useCase = (0, make_get_templates_use_case_1.makeGetTemplatesUseCase)();
    const controller = new get_templates_controller_1.GetTemplatesController(useCase, {});
    return (0, make_controller_error_decorator_1.makeControllerErrorDecorator)((0, make_controller_auth_decorator_1.makeControllerAuthDecorator)(controller));
}
//# sourceMappingURL=make-get-templates-controller.js.map