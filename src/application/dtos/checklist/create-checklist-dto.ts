import { AuthenticatedUserDTO } from "../authenticated-user-dto";

export interface CreateChecklistDTO {
  currentUser: AuthenticatedUserDTO;
  title: string;
  items: CreateChecklistItemDTO[];
}

interface CreateChecklistItemDTO {
  label: string;
  description: string | null;
  weight: number;
}
