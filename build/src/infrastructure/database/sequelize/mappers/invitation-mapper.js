"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvitationMapper = void 0;
const invitation_1 = require("../../../../domain/entities/invitation");
class InvitationMapper {
    static toEntity(model) {
        return invitation_1.Invitation.fromPersistence({
            id: model.id,
            companyId: model.companyId,
            name: model.name,
            phone: model.phone,
            role: model.role,
            isAccepted: model.isAccepted,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt,
            deletedAt: model.deletedAt,
        });
    }
    static toEntityList(models) {
        return models.map((m) => this.toEntity(m));
    }
    static toPersistence(entity) {
        return {
            id: entity.id,
            companyId: entity.companyId,
            name: entity.name,
            phone: entity.phone,
            role: entity.role,
            isAccepted: entity.isAccepted,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            deletedAt: entity.deletedAt,
        };
    }
    static toPersistenceList(entities) {
        return entities.map((e) => this.toPersistence(e));
    }
}
exports.InvitationMapper = InvitationMapper;
