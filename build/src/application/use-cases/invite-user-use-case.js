"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InviteUserUseCase = void 0;
const invitation_1 = require("../../domain/entities/invitation");
const role_enum_1 = require("../../domain/enums/role-enum");
const errors_1 = require("../../domain/errors/errors");
class InviteUserUseCase {
    constructor(invitationRepository, uuidGenerator) {
        this.invitationRepository = invitationRepository;
        this.uuidGenerator = uuidGenerator;
    }
    execute(data) {
        if (data.currentUser.role !== role_enum_1.RoleEnum.manager) {
            throw new errors_1.ForbiddenError("Only managers can invite users");
        }
        if (![role_enum_1.RoleEnum.supevisor, role_enum_1.RoleEnum.employee].includes(data.role)) {
            throw new errors_1.ForbiddenError(`Invited role must be 'supervisor' or 'employee'`);
        }
        const invitation = invitation_1.Invitation.create({
            id: this.uuidGenerator.generate(),
            name: data.name,
            role: data.role,
            phone: data.phone,
            companyId: data.currentUser.companyId,
            isAccepted: false,
        });
        return this.invitationRepository.create(invitation);
    }
}
exports.InviteUserUseCase = InviteUserUseCase;
