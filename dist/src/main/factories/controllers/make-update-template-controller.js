"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUpdateTemplateController = makeUpdateTemplateController;
const zod_adapter_1 = require("../../../infrastructure/adapters/zod-adapter");
const update_template_schema_1 = require("../../../infrastructure/schemas/update-template-schema");
const update_template_controller_1 = require("../../../presentation/controllers/update-template-controller");
const make_controller_auth_decorator_1 = require("../decorators/make-controller-auth-decorator");
const make_controller_error_decorator_1 = require("../decorators/make-controller-error-decorator");
const make_update_template_use_case_1 = require("../usecases/make-update-template-use-case");
function makeUpdateTemplateController() {
    const validator = new zod_adapter_1.ZodValidator(update_template_schema_1.updateTemplateSchema);
    const useCase = (0, make_update_template_use_case_1.makeUpdateTemplateUseCase)();
    const controller = new update_template_controller_1.UpdateTemplateController(useCase, validator);
    return (0, make_controller_error_decorator_1.makeControllerErrorDecorator)((0, make_controller_auth_decorator_1.makeControllerAuthDecorator)(controller));
}
//# sourceMappingURL=make-update-template-controller.js.map