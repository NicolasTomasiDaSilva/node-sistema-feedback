import { IChecklistRepository } from "../../../../application/protocols/repositories/checklist-repository";
import { Checklist } from "../../../../domain/entities/checklist";
import { ChecklistItemMapper } from "../mappers/checklist-item-mapper";
import { ChecklistMapper } from "../mappers/checklist-mapper";
import { ChecklistModel } from "../models/checklist";

export class SequelizeChecklistRepository implements IChecklistRepository {
  async create(data: Checklist): Promise<Checklist> {
    const model = ChecklistMapper.toPersistence(data);
    return ChecklistMapper.toEntity(await ChecklistModel.create(model));
  }
}
