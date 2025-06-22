import { Invitation } from "../../../domain/entities/invitation";
import { RoleEnum } from "../../../domain/enums/role-enum";
import { InviteUserDTO } from "../../dtos/invite-user-dto";

export interface IInviteUserUseCase {
  execute(data: InviteUserDTO): Promise<Invitation>;
}
