"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackItemMapper = void 0;
const feedback_item_1 = require("../../../../domain/entities/feedback-item");
class FeedbackItemMapper {
    static toEntity(model) {
        return feedback_item_1.FeedbackItem.fromPersistence({
            observation: model.observation,
            score: model.score,
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
            observation: entity.observation,
            score: entity.score,
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
exports.FeedbackItemMapper = FeedbackItemMapper;
//# sourceMappingURL=feedback-item-mapper.js.map