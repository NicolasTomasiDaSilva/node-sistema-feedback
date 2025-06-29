import { ChecklistItem } from "../../../../domain/entities/checklist-item";
import {
  ChecklistItemAttributes,
  ChecklistItemModel,
} from "../models/checklist-item";

export class ChecklistItemMapper {
  static toEntity(model: ChecklistItemModel): ChecklistItem {
    return ChecklistItem.fromPersistence({
      id: model.id,
      checklistId: model.checklistId,
      label: model.label,
      description: model.description,
      weight: model.weight,
      order: model.order,

      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      deletedAt: model.deletedAt,
    });
  }

  static toEntityList(models: ChecklistItemModel[]): ChecklistItem[] {
    return models.map((m) => this.toEntity(m));
  }

  static toPersistence(entity: ChecklistItem): ChecklistItemAttributes {
    return {
      id: entity.id,
      checklistId: entity.checklistId,
      label: entity.label,
      description: entity.description,
      weight: entity.weight,
      order: entity.order,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    };
  }

  static toPersistenceList(
    entities: ChecklistItem[]
  ): ChecklistItemAttributes[] {
    return entities.map((e) => this.toPersistence(e));
  }
}
