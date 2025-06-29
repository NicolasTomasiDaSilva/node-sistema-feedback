import { FeedbackItem } from "../../../../domain/entities/feedback-tem";
import {
  FeedbackItemAttributes,
  FeedbackItemModel,
} from "../models/feedback-item";
import { ChecklistItemMapper } from "./checklist-item-mapper";
import { ChecklistMapper } from "./checklist-mapper";

export class FeedbackItemMapper {
  static toEntity(model: FeedbackItemModel): FeedbackItem {
    return FeedbackItem.fromPersistence({
      id: model.id,
      feedbackId: model.feedbackId,
      checklistItemId: model.checklistItemId,
      checklistItem: ChecklistItemMapper.toEntity(model.checklistItem),
      observation: model.observation,
      score: model.score,
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
      checklistItemId: entity.checklistItemId,
      observation: entity.observation,
      score: entity.score,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    };
  }

  static toPersistenceList(entities: FeedbackItem[]): FeedbackItemAttributes[] {
    return entities.map((e) => this.toPersistence(e));
  }
}
