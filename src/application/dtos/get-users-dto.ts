import { AuthenticatedUserDTO } from "./authenticated-user-dto";

export interface GetUsersDTO {
  currentUser: AuthenticatedUserDTO;
  page?: number;
  perPage?: number;
  name?: string;
}
