import { TemplateFeedbackItem } from "../../../../domain/entities/template-feedback-item";
import {
  TemplateFeedbackItemAttributes,
  TemplateFeedbackItemModel,
} from "../models/template-feedback-item";

export class TemplateFeedbackItemMapper {
  static toEntity(model: TemplateFeedbackItemModel): TemplateFeedbackItem {
    return TemplateFeedbackItem.fromPersistence({
      id: model.id,
      templateFeedbackId: model.templateFeedbackId,
      label: model.label,
      description: model.description,
      weight: model.weight,
      order: model.order,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      deletedAt: model.deletedAt,
    });
  }

  static toEntityList(
    models: TemplateFeedbackItemModel[]
  ): TemplateFeedbackItem[] {
    return models.map((m) => this.toEntity(m));
  }

  static toPersistence(
    entity: TemplateFeedbackItem
  ): Omit<
    TemplateFeedbackItemAttributes,
    "id" | "templateFeedbackId" | "createdAt" | "updatedAt" | "deletedAt"
  > {
    return {
      label: entity.label,
      description: entity.description,
      weight: entity.weight,
      order: entity.order,
    };
  }

  static toPersistenceList(
    entities: TemplateFeedbackItem[]
  ): Omit<
    TemplateFeedbackItemAttributes,
    "id" | "templateFeedbackId" | "createdAt" | "updatedAt" | "deletedAt"
  >[] {
    return entities.map((e) => this.toPersistence(e));
  }
}
