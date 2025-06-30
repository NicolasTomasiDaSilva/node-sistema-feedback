import { FeedbackItem } from "../../../../domain/entities/feedback-item";
import {
  FeedbackItemAttributes,
  FeedbackItemModel,
} from "../models/feedback-item";
import { ChecklistItemMapper } from "./template-feedback-item-mapper";
import { ChecklistMapper } from "./template-feedback-mapper";

export class FeedbackItemMapper {
  static toEntity(model: FeedbackItemModel): FeedbackItem {
    return FeedbackItem.fromPersistence({
      id: model.id,
      feedbackId: model.feedbackId,
      observation: model.observation,
      score: model.score,
      label: model.label,
      description: model.description,
      weight: model.weight,
      order: model.order,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      deletedAt: model.deletedAt,
    });
  }

  static toEntityList(models: FeedbackItemModel[]): FeedbackItem[] {
    return models.map((m) => this.toEntity(m));
  }

  static toPersistence(entity: FeedbackItem): FeedbackItemAttributes {
    return {
      id: entity.id,
      feedbackId: entity.feedbackId,
      observation: entity.observation,
      score: entity.score,
      label: entity.label,
      description: entity.description,
      weight: entity.weight,
      order: entity.order,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    };
  }

  static toPersistenceList(entities: FeedbackItem[]): FeedbackItemAttributes[] {
    return entities.map((e) => this.toPersistence(e));
  }
}
