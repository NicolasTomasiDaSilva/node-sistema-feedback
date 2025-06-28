import { RoleEnum } from "../../domain/enums/role-enum";

export interface AuthenticatedUserDTO {
  id: string;
  companyId: string;
  role: RoleEnum;
}
