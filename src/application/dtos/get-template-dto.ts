import { AuthenticatedUserDTO } from "./authenticated-user-dto";

export interface GetTemplateDTO {
  currentUser: AuthenticatedUserDTO;
  id: string;
}
