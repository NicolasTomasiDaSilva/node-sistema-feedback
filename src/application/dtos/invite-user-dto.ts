import { RoleEnum } from "../../domain/enums/role-enum";

export interface InviteUserDTO {
  name: string;
  role: RoleEnum;
}
