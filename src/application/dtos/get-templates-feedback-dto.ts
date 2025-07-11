import { AuthenticatedUserDTO } from "./authenticated-user-dto";

export interface GetTemplatesFeedbackDTO {
  currentUser: AuthenticatedUserDTO;
  page?: number;
  perPage?: number;
  receiverName?: string;
}
