import { AuthenticatedUserDTO } from "../authenticated-user-dto";
import { CreateChecklistItemDto } from "./create-checklist-item-dto";

export interface CreateChecklistDto {
  currentUser: AuthenticatedUserDTO;
  title: string;
  items: CreateChecklistItemDto[];
}
