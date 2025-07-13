import { IPagination } from "../protocols/pagination";
import { AuthenticatedUserDTO } from "./authenticated-user-dto";

export interface GetUsersDTO extends IPagination {
  currentUser: AuthenticatedUserDTO;
  name?: string;
}
