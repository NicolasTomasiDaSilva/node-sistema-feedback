import { AuthenticatedUserDTO } from "./authenticated-user-dto";

export interface UpdateTemplateFeedbackDTO {
  currentUser: AuthenticatedUserDTO;
  id: string;
  title: string;
  items: UpdateTemplateFeedbackItemDTO[];
}

interface UpdateTemplateFeedbackItemDTO {
  label: string;
  description: string | null;
  weight: number;
  order: number;
}
