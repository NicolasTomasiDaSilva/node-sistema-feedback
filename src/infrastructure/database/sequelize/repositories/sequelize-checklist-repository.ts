import { IChecklistRepository } from "../../../../application/protocols/repositories/checklist-repository";
import { Checklist } from "../../../../domain/entities/checklist";
import { ChecklistMapper } from "../mappers/checklist-mapper";
import { ChecklistModel } from "../models/checklist";
import { ChecklistItemModel } from "../models/checklist-item";

export class SequelizeChecklistRepository implements IChecklistRepository {
  async create(data: Checklist): Promise<Checklist> {
    const model = ChecklistMapper.toPersistence(data);
    const created = await ChecklistModel.create(model, {
      include: [{ model: ChecklistItemModel, as: "items" }],
    });
    return ChecklistMapper.toEntity(created);
  }
}
