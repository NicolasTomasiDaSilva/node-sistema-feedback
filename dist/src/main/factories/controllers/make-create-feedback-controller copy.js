"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCreateFeedbackController = makeCreateFeedbackController;
const zod_adapter_1 = require("../../../infrastructure/adapters/zod-adapter");
const create_feedback_schema_1 = require("../../../infrastructure/schemas/create-feedback-schema");
const create_feedback_controller_1 = require("../../../presentation/controllers/create-feedback-controller");
const make_controller_auth_decorator_1 = require("../decorators/make-controller-auth-decorator");
const make_controller_error_decorator_1 = require("../decorators/make-controller-error-decorator");
const make_create_feedback_use_case_1 = require("../usecases/make-create-feedback-use-case");
function makeCreateFeedbackController() {
    const validator = new zod_adapter_1.ZodValidator(create_feedback_schema_1.createFeedbackSchema);
    const useCase = (0, make_create_feedback_use_case_1.makeCreateFeedbackUseCase)();
    const controller = new create_feedback_controller_1.CreateFeedbackController(useCase, validator);
    return (0, make_controller_error_decorator_1.makeControllerErrorDecorator)((0, make_controller_auth_decorator_1.makeControllerAuthDecorator)(controller));
}
//# sourceMappingURL=make-create-feedback-controller%20copy.js.map