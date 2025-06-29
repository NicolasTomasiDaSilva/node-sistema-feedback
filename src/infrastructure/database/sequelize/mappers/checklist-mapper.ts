import { InferAttributes } from "sequelize";
import { Checklist } from "../../../../domain/entities/checklist";
import { ChecklistModel } from "../models/checklist";
import { ChecklistItemMapper } from "./checklist-item-mapper";

export class ChecklistMapper {
  static toEntity(model: ChecklistModel): Checklist {
    return Checklist.fromPersistence({
      id: model.id,
      companyId: model.companyId,
      title: model.title,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      deletedAt: model.deletedAt,
      items: model.items
        ? ChecklistItemMapper.toEntityList(model.items)
        : undefined,
    });
  }

  static toEntityList(models: ChecklistModel[]): Checklist[] {
    return models.map((m) => this.toEntity(m));
  }

  static toPersistence(entity: Checklist): InferAttributes<ChecklistModel> {
    return {
      id: entity.id,
      companyId: entity.companyId,
      title: entity.title,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    };
  }

  static toPersistenceList(
    entities: Checklist[]
  ): InferAttributes<ChecklistModel>[] {
    return entities.map((e) => this.toPersistence(e));
  }
}
