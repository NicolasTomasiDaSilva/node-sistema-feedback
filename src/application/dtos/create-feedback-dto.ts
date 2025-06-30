import { AuthenticatedUserDTO } from "./authenticated-user-dto";

export interface CreateFeedbackDTO {
  currentUser: AuthenticatedUserDTO;
  receiverId: string;
  title: string;
  description: string | null;
  observation: string | null;
  score: number;
  items: CreateFeedbackItemDTO[];
}

interface CreateFeedbackItemDTO {
  label: string;
  description: string | null;
  observation: string | null;
  score: number;
  weight: number;
  order: number;
}
