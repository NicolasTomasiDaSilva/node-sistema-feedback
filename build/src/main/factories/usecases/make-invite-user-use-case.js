"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeInviteUserUseCase = makeInviteUserUseCase;
const invite_user_use_case_1 = require("../../../application/use-cases/invite-user-use-case");
function makeInviteUserUseCase() {
    return new invite_user_use_case_1.InviteUserUseCase();
}
