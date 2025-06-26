import { RoleEnum } from "../../domain/enums/role-enum";

export interface TokenPayloadDTO {
  id: string;
  companyId: string;
  role: RoleEnum;
}
