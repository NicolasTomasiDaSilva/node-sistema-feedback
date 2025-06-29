import { FeedbackItem } from "../../../../domain/entities/feedback-tem";
import {
  FeedbackItemAttributes,
  FeedbackItemModel,
} from "../models/feedback-item";

export class FeedbackItemMapper {
  static toEntity(model: FeedbackItemModel): FeedbackItem {
    return FeedbackItem.fromPersistence({
      id: model.id,
      feedbackId: model.feedbackId,
      checklistItemId: model.checklistItemId,
      isChecked: model.isChecked,
      checklistItem: model.chec
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

      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    };
  }

  static toPersistenceList(entities: FeedbackItem[]): FeedbackItemAttributes[] {
    return entities.map((e) => this.toPersistence(e));
  }
}
