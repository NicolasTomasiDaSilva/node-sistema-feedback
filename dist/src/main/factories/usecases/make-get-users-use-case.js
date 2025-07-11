"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetUsersUseCase = makeGetUsersUseCase;
const get_users_use_case_1 = require("../../../application/use-cases/get-users-use-case");
const make_unit_of_work_1 = require("../repositories/make-unit-of-work");
function makeGetUsersUseCase() {
    const unitOfWork = (0, make_unit_of_work_1.makeUnitOfWork)();
    return new get_users_use_case_1.GetUsersUseCase(unitOfWork);
}
//# sourceMappingURL=make-get-users-use-case.js.map