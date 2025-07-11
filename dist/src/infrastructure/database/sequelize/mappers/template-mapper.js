"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateMapper = void 0;
const template_1 = require("../../../../domain/entities/template");
const template_item_mapper_1 = require("./template-item-mapper");
class TemplateMapper {
    static toEntity(model) {
        return template_1.Template.fromPersistence({
            id: model.id,
            title: model.title,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt,
            deletedAt: model.deletedAt,
            items: model.items
                ? template_item_mapper_1.TemplateItemMapper.toEntityList(model.items)
                : undefined,
        });
    }
    static toEntityList(models) {
        return models.map((m) => this.toEntity(m));
    }
    static toPersistence(entity) {
        return {
            id: entity.id,
            companyId: "", // Será preenchido pelo repositório
            title: entity.title,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            deletedAt: entity.deletedAt,
        };
    }
    static toPersistenceList(entities) {
        return entities.map((e) => this.toPersistence(e));
    }
}
exports.TemplateMapper = TemplateMapper;
//# sourceMappingURL=template-mapper.js.map