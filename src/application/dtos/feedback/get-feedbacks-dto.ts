import { AuthenticatedUserDTO } from "../authenticated-user-dto";

export interface GetFeedbacksDTO {
  currentUser: AuthenticatedUserDTO;
  page?: number;
  perPage?: number;
}
