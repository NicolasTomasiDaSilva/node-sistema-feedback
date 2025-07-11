"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCreateTemplateController = makeCreateTemplateController;
const zod_adapter_1 = require("../../../infrastructure/adapters/zod-adapter");
const create_template_schema_1 = require("../../../infrastructure/schemas/create-template-schema");
const create_template_controller_1 = require("../../../presentation/controllers/create-template-controller");
const make_controller_auth_decorator_1 = require("../decorators/make-controller-auth-decorator");
const make_controller_error_decorator_1 = require("../decorators/make-controller-error-decorator");
const make_create_template_use_case_1 = require("../usecases/make-create-template-use-case");
function makeCreateTemplateController() {
    const validator = new zod_adapter_1.ZodValidator(create_template_schema_1.createTemplateSchema);
    const useCase = (0, make_create_template_use_case_1.makeCreateTemplateUseCase)();
    const controller = new create_template_controller_1.CreateTemplateController(useCase, validator);
    return (0, make_controller_error_decorator_1.makeControllerErrorDecorator)((0, make_controller_auth_decorator_1.makeControllerAuthDecorator)(controller));
}
//# sourceMappingURL=make-create-template-controller.js.map