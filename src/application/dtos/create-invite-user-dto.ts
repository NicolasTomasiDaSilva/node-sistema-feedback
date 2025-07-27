import { RoleEnum } from "../../domain/enums/role-enum";
import { AuthenticatedUserDTO } from "./authenticated-user-dto";

export interface CreateInviteUserDTO {
  currentUser: AuthenticatedUserDTO;
  name: string;
  phone: string | null;
  cpf: string;
  role: RoleEnum.supervisor | RoleEnum.employee;
}
