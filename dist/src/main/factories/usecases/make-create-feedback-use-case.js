"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCreateFeedbackUseCase = makeCreateFeedbackUseCase;
const create_feedback_use_case_1 = require("../../../application/use-cases/create-feedback-use-case");
const uuid_adapter_1 = require("../../../infrastructure/adapters/uuid-adapter");
const make_unit_of_work_1 = require("../repositories/make-unit-of-work");
function makeCreateFeedbackUseCase() {
    const uuidAdapter = new uuid_adapter_1.UuidAdapter();
    const unitOfWork = (0, make_unit_of_work_1.makeUnitOfWork)();
    return new create_feedback_use_case_1.CreateFeedbackUseCase(unitOfWork, uuidAdapter);
}
//# sourceMappingURL=make-create-feedback-use-case.js.map