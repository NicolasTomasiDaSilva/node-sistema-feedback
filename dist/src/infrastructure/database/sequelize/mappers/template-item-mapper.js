"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateItemMapper = void 0;
const template_item_1 = require("../../../../domain/entities/template-item");
class TemplateItemMapper {
    static toEntity(model) {
        return template_item_1.TemplateItem.fromPersistence({
            label: model.label,
            description: model.description,
            weight: model.weight,
            order: model.order,
        });
    }
    static toEntityList(models) {
        return models.map((m) => this.toEntity(m));
    }
    static toPersistence(entity) {
        return {
            label: entity.label,
            description: entity.description,
            weight: entity.weight,
            order: entity.order,
        };
    }
    static toPersistenceList(entities) {
        return entities.map((e) => this.toPersistence(e));
    }
}
exports.TemplateItemMapper = TemplateItemMapper;
//# sourceMappingURL=template-item-mapper.js.map