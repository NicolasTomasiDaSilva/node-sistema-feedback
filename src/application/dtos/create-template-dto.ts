import { AuthenticatedUserDTO } from "./authenticated-user-dto";

export interface CreateTemplateDTO {
  currentUser: AuthenticatedUserDTO;
  title: string;
  items: CreateTemplateItemDTO[];
}

interface CreateTemplateItemDTO {
  label: string;
  description: string | null;
  weight: number;
  order: number;
}
