"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetFeedbacksUseCase = makeGetFeedbacksUseCase;
const get_feedbacks_use_case_1 = require("../../../application/use-cases/get-feedbacks-use-case");
const make_unit_of_work_1 = require("../repositories/make-unit-of-work");
function makeGetFeedbacksUseCase() {
    const unitOfWork = (0, make_unit_of_work_1.makeUnitOfWork)();
    return new get_feedbacks_use_case_1.GetFeedbacksUseCase(unitOfWork);
}
//# sourceMappingURL=make-get-feedbacks-use-case.js.map