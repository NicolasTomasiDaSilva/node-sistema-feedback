import { TemplateFeedback } from "../../../../domain/entities/template-feedback";
import {
  TemplateFeedbackAttributes,
  TemplateFeedbackModel,
} from "../models/template-feedback";

import { TemplateFeedbackItemMapper } from "./template-feedback-item-mapper";

export class TemplateFeedbackMapper {
  static toEntity(model: TemplateFeedbackModel): TemplateFeedback {
    return TemplateFeedback.fromPersistence({
      id: model.id,
      title: model.title,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      deletedAt: model.deletedAt,
      items: model.items
        ? TemplateFeedbackItemMapper.toEntityList(model.items)
        : undefined,
    });
  }

  static toEntityList(models: TemplateFeedbackModel[]): TemplateFeedback[] {
    return models.map((m) => this.toEntity(m));
  }

  static toPersistence(entity: TemplateFeedback): TemplateFeedbackAttributes {
    return {
      id: entity.id,
      companyId: "", // Será preenchido pelo repositório
      title: entity.title,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    };
  }

  static toPersistenceList(
    entities: TemplateFeedback[]
  ): TemplateFeedbackAttributes[] {
    return entities.map((e) => this.toPersistence(e));
  }
}
