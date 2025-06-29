import { IChecklistRepository } from "../../../application/protocols/repositories/checklist-repository";
import { SequelizeChecklistRepository } from "../../../infrastructure/database/sequelize/repositories/sequelize-checklist-repository";

export function makeChecklistRepository(): IChecklistRepository {
  return new SequelizeChecklistRepository();
}
