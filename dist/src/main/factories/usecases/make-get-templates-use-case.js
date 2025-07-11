"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetTemplatesUseCase = makeGetTemplatesUseCase;
const get_templates_use_case_1 = require("../../../application/use-cases/get-templates-use-case");
const make_unit_of_work_1 = require("../repositories/make-unit-of-work");
function makeGetTemplatesUseCase() {
    const unitOfWork = (0, make_unit_of_work_1.makeUnitOfWork)();
    return new get_templates_use_case_1.GetTemplatesUseCase(unitOfWork);
}
//# sourceMappingURL=make-get-templates-use-case.js.map