import { CreationAttributes } from "sequelize";
import { Feedback } from "../../../../domain/entities/feedback";
import { FeedbackModel } from "../models/feedback";

/**
 * Responsável apenas por converter FeedbackModel (ORM) em entidade de domínio Feedback.
 */
export class FeedbackMapper {
  static toEntity(model: FeedbackModel): Feedback {
    return Feedback.fromPersistence({
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
  static toEntityList(models: FeedbackModel[]): Feedback[] {
    return models.map((m) => this.toEntity(m));
  }

  static toPersistence(entity: Feedback): CreationAttributes<FeedbackModel> {
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
}
