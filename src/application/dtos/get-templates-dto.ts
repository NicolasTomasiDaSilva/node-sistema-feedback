import { IPagination } from "../protocols/pagination";
import { AuthenticatedUserDTO } from "./authenticated-user-dto";

export interface GetTemplatesDTO extends IPagination {
  currentUser: AuthenticatedUserDTO;
  templateName?: string;
}
