"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeInviteUserUseCase = makeInviteUserUseCase;
const invite_user_use_case_1 = require("../../../application/use-cases/invite-user-use-case");
const uuid_adapter_1 = require("../../../infrastructure/adapters/uuid-adapter");
const make_unit_of_work_1 = require("../repositories/make-unit-of-work");
function makeInviteUserUseCase() {
    const uuidAdapter = new uuid_adapter_1.UuidAdapter();
    const unitOfWork = (0, make_unit_of_work_1.makeUnitOfWork)();
    return new invite_user_use_case_1.InviteUserUseCase(unitOfWork, uuidAdapter);
}
//# sourceMappingURL=make-invite-user-use-case.js.map