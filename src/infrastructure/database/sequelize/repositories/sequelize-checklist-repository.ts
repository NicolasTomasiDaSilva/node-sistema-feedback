import { IChecklistRepository } from "../../../../application/protocols/repositories/checklist-repository";
import { Checklist } from "../../../../domain/entities/checklist";
import { ChecklistModel } from "../models/checklist";

export class SequelizeChecklistRepository implements IChecklistRepository {
  async create(data: Checklist): Promise<Checklist> {
    return data;
  }
}
