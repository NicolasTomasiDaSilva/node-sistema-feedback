"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InviteUserUseCase = void 0;
const invitation_1 = require("../../domain/entities/invitation");
class InviteUserUseCase {
    constructor(invitationRepository, uuidGenerator) {
        this.invitationRepository = invitationRepository;
        this.uuidGenerator = uuidGenerator;
    }
    execute(data) {
        const invitation = invitation_1.Invitation.create({
            id: this.uuidGenerator.generate(),
            name: data.name,
            role: data.role,
            companyId: this.uuidGenerator.generate(),
            isAccepted: false,
        });
        return this.invitationRepository.create(invitation);
    }
}
exports.InviteUserUseCase = InviteUserUseCase;
