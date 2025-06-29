import { IChecklistRepository } from "../../../../application/protocols/repositories/checklist-repository";
import { Checklist } from "../../../../domain/entities/checklist";
import { ChecklistItemMapper } from "../mappers/checklist-item-mapper";
import { ChecklistMapper } from "../mappers/checklist-mapper";
import { ChecklistModel } from "../models/checklist";
import { ChecklistItemModel } from "../models/checklist-item";

export class SequelizeChecklistRepository implements IChecklistRepository {
  async create(data: Checklist): Promise<Checklist> {
    const checklistModel = ChecklistMapper.toPersistence(data);
    const createdChecklist = await ChecklistModel.create(checklistModel);

    const checklist = ChecklistMapper.toEntity(createdChecklist);

    if (data.items) {
      const checklistItemsModels = data.items.map((item) => {
        return ChecklistItemMapper.toPersistence(item);
      });
      const createdChecklistItems = await ChecklistItemModel.bulkCreate(
        checklistItemsModels
      );

      checklist.items = ChecklistItemMapper.toEntityList(createdChecklistItems);
    }

    return checklist;
  }
}
