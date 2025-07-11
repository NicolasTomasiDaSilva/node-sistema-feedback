"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUpdateTemplateUseCase = makeUpdateTemplateUseCase;
const update_template_use_case_1 = require("../../../application/use-cases/update-template-use-case");
const make_unit_of_work_1 = require("../repositories/make-unit-of-work");
function makeUpdateTemplateUseCase() {
    const unitOfWork = (0, make_unit_of_work_1.makeUnitOfWork)();
    return new update_template_use_case_1.UpdateTemplateUseCase(unitOfWork);
}
//# sourceMappingURL=make-update-template-use-case.js.map