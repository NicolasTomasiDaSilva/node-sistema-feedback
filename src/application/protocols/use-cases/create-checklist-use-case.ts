import { Checklist } from "../../../domain/entities/checklist";
import { CreateChecklistDto } from "../../dtos/checklist/create-checklist-dto";

export interface ICreateChecklistUseCase {
  execute(data: CreateChecklistDto): Promise<Checklist>;
}
