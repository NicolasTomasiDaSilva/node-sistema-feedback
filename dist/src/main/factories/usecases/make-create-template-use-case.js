"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCreateTemplateUseCase = makeCreateTemplateUseCase;
const create_template_use_case_1 = require("../../../application/use-cases/create-template-use-case");
const uuid_adapter_1 = require("../../../infrastructure/adapters/uuid-adapter");
const make_unit_of_work_1 = require("../repositories/make-unit-of-work");
function makeCreateTemplateUseCase() {
    const uuidAdapter = new uuid_adapter_1.UuidAdapter();
    const unitOfWork = (0, make_unit_of_work_1.makeUnitOfWork)();
    return new create_template_use_case_1.CreateTemplateUseCase(unitOfWork, uuidAdapter);
}
//# sourceMappingURL=make-create-template-use-case.js.map