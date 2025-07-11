import { TemplateItem } from "../../../../domain/entities/template-item";
import {
  TemplateItemAttributes,
  TemplateItemModel,
} from "../models/template-item";

export class TemplateItemMapper {
  static toEntity(model: TemplateItemModel): TemplateItem {
    return TemplateItem.fromPersistence({
      label: model.label,
      description: model.description,
      weight: model.weight,
      order: model.order,
    });
  }

  static toEntityList(models: TemplateItemModel[]): TemplateItem[] {
    return models.map((m) => this.toEntity(m));
  }

  static toPersistence(
    entity: TemplateItem
  ): Omit<
    TemplateItemAttributes,
    "id" | "templateId" | "createdAt" | "updatedAt" | "deletedAt"
  > {
    return {
      label: entity.label,
      description: entity.description,
      weight: entity.weight,
      order: entity.order,
    };
  }

  static toPersistenceList(
    entities: TemplateItem[]
  ): Omit<
    TemplateItemAttributes,
    "id" | "templateId" | "createdAt" | "updatedAt" | "deletedAt"
  >[] {
    return entities.map((e) => this.toPersistence(e));
  }
}
