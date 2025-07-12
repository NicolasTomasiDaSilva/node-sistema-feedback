import { AuthenticatedUserDTO } from "./authenticated-user-dto";

export interface GetTemplatesDTO {
  currentUser: AuthenticatedUserDTO;
  page?: number;
  perPage?: number;
  templateName?: string;
}
