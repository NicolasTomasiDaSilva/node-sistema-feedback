import { AuthenticatedUserDTO } from "./authenticated-user-dto";

export interface GetFeedbackDTO {
  currentUser: AuthenticatedUserDTO;
  id: string;
}
