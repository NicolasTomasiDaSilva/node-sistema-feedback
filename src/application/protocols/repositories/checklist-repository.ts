import { Checklist } from "../../../domain/entities/checklist";

export interface IChecklistRepository {
  create(data: Checklist): Promise<Checklist>;
}
