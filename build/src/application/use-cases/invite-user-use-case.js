"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InviteUserUseCase = void 0;
const invitation_1 = require("../../domain/entities/invitation");
class InviteUserUseCase {
    execute(data) {
        return Promise.resolve(new invitation_1.Invitation({
            id: "1",
            name: data.name,
            role: data.role,
            companyId: "1",
        }));
    }
}
exports.InviteUserUseCase = InviteUserUseCase;
