import { InferAttributes } from "sequelize";
import { IChecklistRepository } from "../../../../application/protocols/repositories/checklist-repository";
import { Checklist } from "../../../../domain/entities/checklist";
import { ChecklistItemMapper } from "../mappers/checklist-item-mapper";
import { ChecklistMapper } from "../mappers/checklist-mapper";

import { ChecklistModel } from "../models/checklist";

export class SequelizeChecklistRepository implements IChecklistRepository {
  async create(data: Checklist): Promise<Checklist> {
    const checklistModel = ChecklistMapper.toPersistence(data);

    if (data.items) {
      checklistModel.items = ChecklistItemMapper.toPersistenceList(data.items);
    }

    const newChecklistModel = await ChecklistModel.create(checklistModel);

    return ChecklistMapper.toEntity(newChecklistModel);
  }
}
