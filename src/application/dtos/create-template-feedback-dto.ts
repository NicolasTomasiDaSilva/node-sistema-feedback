import { AuthenticatedUserDTO } from "./authenticated-user-dto";

export interface CreateTemplateFeedbackDTO {
  currentUser: AuthenticatedUserDTO;
  title: string;
  items: CreateTemplateFeedbackItemDTO[];
}

interface CreateTemplateFeedbackItemDTO {
  label: string;
  description: string | null;
  weight: number;
  order: number;
}
