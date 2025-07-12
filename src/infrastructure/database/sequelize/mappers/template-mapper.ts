import { Template } from "../../../../domain/entities/template";
import { TemplateAttributes, TemplateModel } from "../models/template";
import { TemplateItemMapper } from "./template-item-mapper";

export class TemplateMapper {
  static toEntity(model: TemplateModel): Template {
    return Template.fromPersistence({
      id: model.id,
      title: model.title,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      deletedAt: model.deletedAt,
      items: model.items
        ? TemplateItemMapper.toEntityList(model.items)
        : undefined,
    });
  }

  static toEntityList(models: TemplateModel[]): Template[] {
    return models.map((m) => this.toEntity(m));
  }

  static toPersistence(entity: Template): TemplateAttributes {
    return {
      id: entity.id,
      companyId: "", // Será preenchido pelo repositório
      title: entity.title,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    };
  }

  static toPersistenceList(entities: Template[]): TemplateAttributes[] {
    return entities.map((e) => this.toPersistence(e));
  }
}
