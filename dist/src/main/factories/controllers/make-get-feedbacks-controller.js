"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetFeedbacksController = makeGetFeedbacksController;
const zod_adapter_1 = require("../../../infrastructure/adapters/zod-adapter");
const get_feedbacks_schema_1 = require("../../../infrastructure/schemas/get-feedbacks-schema");
const get_feedbacks_controller_1 = require("../../../presentation/controllers/get-feedbacks-controller");
const make_controller_auth_decorator_1 = require("../decorators/make-controller-auth-decorator");
const make_controller_error_decorator_1 = require("../decorators/make-controller-error-decorator");
const make_get_feedbacks_use_case_1 = require("../usecases/make-get-feedbacks-use-case");
function makeGetFeedbacksController() {
    const validator = new zod_adapter_1.ZodValidator(get_feedbacks_schema_1.getFeedbacksSchema);
    const useCase = (0, make_get_feedbacks_use_case_1.makeGetFeedbacksUseCase)();
    const controller = new get_feedbacks_controller_1.GetFeedbacksController(useCase, validator);
    return (0, make_controller_error_decorator_1.makeControllerErrorDecorator)((0, make_controller_auth_decorator_1.makeControllerAuthDecorator)(controller));
}
//# sourceMappingURL=make-get-feedbacks-controller.js.map