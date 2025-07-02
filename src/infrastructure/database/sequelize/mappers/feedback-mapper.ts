import { Feedback } from "../../../../domain/entities/feedback";
import { FeedbackAttributes, FeedbackModel } from "../models/feedback";
import { FeedbackItemMapper } from "./feedback-item-mapper";

export class FeedbackMapper {
  static toEntity(model: FeedbackModel): Feedback {
    return Feedback.fromPersistence({
      id: model.id,
      giverId: model.giverId,
      receiverId: model.receiverId,
      title: model.title,
      description: model.description,
      observation: model.observation,
      score: model.score,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      deletedAt: model.deletedAt,
      items: model.items
        ? FeedbackItemMapper.toEntityList(model.items)
        : undefined,
    });
  }
  static toEntityList(models: FeedbackModel[]): Feedback[] {
    return models.map((m) => this.toEntity(m));
  }

  static toPersistence(entity: Feedback): FeedbackAttributes {
    return {
      id: entity.id,
      giverId: entity.giverId,
      receiverId: entity.receiverId,
      companyId: "", // Será preenchido pelo repositório
      title: entity.title,
      description: entity.description,
      observation: entity.observation,
      score: entity.score,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    };
  }

  static toPersistenceList(entities: Feedback[]): FeedbackAttributes[] {
    return entities.map((e) => this.toPersistence(e));
  }
}
