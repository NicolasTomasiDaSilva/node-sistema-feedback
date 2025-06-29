import { Checklist } from "../../../domain/entities/checklist";
import { CreateChecklistDTO } from "../../dtos/checklist/create-checklist-dto";

export interface ICreateChecklistUseCase {
  execute(data: CreateChecklistDTO): Promise<Checklist>;
}
