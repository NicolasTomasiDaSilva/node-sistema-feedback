"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const user_1 = require("../../../../domain/entities/user");
class UserMapper {
    static toEntity(model) {
        return user_1.User.fromPersistence({
            id: model.id,
            companyId: model.companyId,
            email: model.email,
            name: model.name,
            cpf: model.cpf,
            role: model.role,
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
            email: entity.email,
            name: entity.name,
            cpf: entity.cpf,
            role: entity.role,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            deletedAt: entity.deletedAt,
        };
    }
    static toPersistenceList(entities) {
        return entities.map((e) => this.toPersistence(e));
    }
}
exports.UserMapper = UserMapper;
//# sourceMappingURL=user-mapper.js.map