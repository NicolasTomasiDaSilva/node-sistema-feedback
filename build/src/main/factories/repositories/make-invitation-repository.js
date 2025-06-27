"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeInvitationRepository = makeInvitationRepository;
const sequelize_invitation_repository_1 = require("../../../infrastructure/database/sequelize/repositories/sequelize-invitation-repository");
function makeInvitationRepository() {
    return new sequelize_invitation_repository_1.SequelizeInvitationRepository();
}
