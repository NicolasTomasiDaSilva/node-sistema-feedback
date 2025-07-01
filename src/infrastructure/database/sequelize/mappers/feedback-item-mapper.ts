import { FeedbackItem } from "../../../../domain/entities/feedback-item";
import {
  FeedbackItemAttributes,
  FeedbackItemModel,
} from "../models/feedback-item";

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

  static toPersistence(
    entity: FeedbackItem
  ): Omit<
    FeedbackItemAttributes,
    "id" | "feedbackId" | "createdAt" | "updatedAt" | "deletedAt"
  > {
    return {
      observation: entity.observation,
      score: entity.score,
      label: entity.label,
      description: entity.description,
      weight: entity.weight,
      order: entity.order,
    };
  }

  static toPersistenceList(
    entities: FeedbackItem[]
  ): Omit<
    FeedbackItemAttributes,
    "id" | "feedbackId" | "createdAt" | "updatedAt" | "deletedAt"
  >[] {
    return entities.map((e) => this.toPersistence(e));
  }
}
