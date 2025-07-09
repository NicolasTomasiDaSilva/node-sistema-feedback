import { AuthenticatedUserDTO } from "./authenticated-user-dto";

export interface UpdateTemplateFeedbackDTO {
  id: string;
  currentUser: AuthenticatedUserDTO;
  title: string;
  items: UpdateTemplateFeedbackItemDTO[];
}

interface UpdateTemplateFeedbackItemDTO {
  label: string;
  description: string | null;
  weight: number;
  order: number;
}
