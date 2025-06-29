import { AuthenticatedUserDTO } from "../authenticated-user-dto";
import { CreateChecklistItemDTO } from "./create-checklist-item-dto";

export interface CreateChecklistDTO {
  currentUser: AuthenticatedUserDTO;
  title: string;
  items: CreateChecklistItemDTO[];
}
