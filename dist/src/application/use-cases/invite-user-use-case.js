"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InviteUserUseCase = void 0;
const invitation_1 = require("../../domain/entities/invitation");
const role_enum_1 = require("../../domain/enums/role-enum");
const errors_1 = require("../../domain/errors/errors");
class InviteUserUseCase {
    constructor(unitOfWork, uuidGenerator) {
        this.unitOfWork = unitOfWork;
        this.uuidGenerator = uuidGenerator;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (data.currentUser.role !== role_enum_1.RoleEnum.manager) {
                throw new errors_1.ForbiddenError("Only managers can invite users");
            }
            if (![role_enum_1.RoleEnum.supervisor, role_enum_1.RoleEnum.employee].includes(data.role)) {
                throw new errors_1.ForbiddenError(`Invited role must be 'supervisor' or 'employee'`);
            }
            const invitation = invitation_1.Invitation.create({
                id: this.uuidGenerator.generate(),
                name: data.name,
                role: data.role,
                phone: data.phone,
                cpf: data.cpf,
                companyId: data.currentUser.companyId,
                isAccepted: false,
            });
            const invitationAcceptUrl = `http://localhost:3000/accept-invitation/${invitation.id}`;
            try {
                yield this.unitOfWork.start();
                const createdInvitation = yield this.unitOfWork
                    .getInvitationRepository()
                    .create(invitation);
                yield this.unitOfWork.commit();
                return createdInvitation;
            }
            catch (error) {
                yield this.unitOfWork.rollback();
                throw error;
            }
        });
    }
}
exports.InviteUserUseCase = InviteUserUseCase;
//# sourceMappingURL=invite-user-use-case.js.map