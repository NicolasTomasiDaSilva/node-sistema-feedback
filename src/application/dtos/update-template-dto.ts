import { AuthenticatedUserDTO } from "./authenticated-user-dto";

export interface UpdateTemplateDTO {
  currentUser: AuthenticatedUserDTO;
  id: string;
  title: string;
  description: string | null;
  items: UpdateTemplateItemDTO[];
}

interface UpdateTemplateItemDTO {
  label: string;
  description: string | null;
  weight: number;
  order: number;
}
