import { InferAttributes } from "sequelize";
import { ChecklistItem } from "../../../../domain/entities/checklist-item";
import { ChecklistItemModel } from "../models/checklist-item";

export class ChecklistItemMapper {
  static toEntity(model: ChecklistItemModel): ChecklistItem {
    return ChecklistItem.fromPersistence({
      id: model.id,
      checklistId: model.checklistId,
      label: model.label,
      description: model.description,
      weight: model.weight,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      deletedAt: model.deletedAt,
    });
  }

  static toEntityList(models: ChecklistItemModel[]): ChecklistItem[] {
    return models.map((m) => this.toEntity(m));
  }

  static toPersistence(
    entity: ChecklistItem
  ): InferAttributes<ChecklistItemModel> {
    return {
      id: entity.id,
      checklistId: entity.checklistId,
      label: entity.label,
      description: entity.description,
      weight: entity.weight,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    };
  }

  static toPersistenceList(
    entities: ChecklistItem[]
  ): InferAttributes<ChecklistItemModel>[] {
    return entities.map((e) => this.toPersistence(e));
  }
}
