import { IPagination } from "../protocols/pagination";
import { AuthenticatedUserDTO } from "./authenticated-user-dto";

export interface GetFeedbacksDTO extends IPagination {
  currentUser: AuthenticatedUserDTO;
  receiverName?: string;
  minScore?: number;
  maxScore?: number;
}
