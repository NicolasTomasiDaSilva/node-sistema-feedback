"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeInviteUserUseCase = makeInviteUserUseCase;
const invite_user_use_case_1 = require("../../../application/use-cases/invite-user-use-case");
const uuid_adapter_1 = require("../../../infrastructure/adapters/uuid-adapter");
const make_invitation_repository_1 = require("../repositories/make-invitation-repository");
function makeInviteUserUseCase() {
    const uuidAdapter = new uuid_adapter_1.UuidAdapter();
    return new invite_user_use_case_1.InviteUserUseCase((0, make_invitation_repository_1.makeInvitationRepository)(), uuidAdapter);
}
