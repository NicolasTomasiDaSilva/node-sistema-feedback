"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackMapper = void 0;
const feedback_1 = require("../../../../domain/entities/feedback");
class FeedbackMapper {
    static toEntity(model) {
        return feedback_1.Feedback.fromPersistence({
            id: model.id,
            giverId: model.giverId,
            receiverId: model.receiverId,
            checklistId: model.checklistId,
            title: model.title,
            description: model.description,
            observation: model.observation,
            score: model.score,
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
            giverId: entity.giverId,
            receiverId: entity.receiverId,
            checklistId: entity.checklistId,
            title: entity.title,
            description: entity.description,
            observation: entity.observation,
            score: entity.score,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            deletedAt: entity.deletedAt,
        };
    }
    static toPersistenceList(entities) {
        return entities.map((e) => this.toPersistence(e));
    }
}
exports.FeedbackMapper = FeedbackMapper;
