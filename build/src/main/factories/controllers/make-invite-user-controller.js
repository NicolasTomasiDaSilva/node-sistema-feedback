"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeInviteUserController = makeInviteUserController;
const invite_user_controller_1 = require("../../../presentation/controllers/invite-user-controller");
const make_invite_user_use_case_1 = require("../usecases/make-invite-user-use-case");
function makeInviteUserController() {
    return new invite_user_controller_1.InviteUserController((0, make_invite_user_use_case_1.makeInviteUserUseCase)());
}
