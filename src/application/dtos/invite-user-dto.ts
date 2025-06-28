import { RoleEnum } from "../../domain/enums/role-enum";
import { AuthenticatedUserDTO } from "./authenticated-user-dto";

export interface InviteUserDTO {
  currentUser: AuthenticatedUserDTO;
  name: string;
  role: RoleEnum.supevisor | RoleEnum.employee;
}
