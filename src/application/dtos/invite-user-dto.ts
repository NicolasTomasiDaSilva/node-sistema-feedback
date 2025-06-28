import { RoleEnum } from "../../domain/enums/role-enum";

export interface InviteUserDTO {
  userId: string;
  companyId: string;
  name: string;
  role: RoleEnum;
}
