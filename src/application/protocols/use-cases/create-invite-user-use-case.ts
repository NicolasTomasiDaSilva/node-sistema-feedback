import { Invitation } from "../../../domain/entities/invitation";
import { CreateInviteUserDTO } from "../../dtos/create-invite-user-dto";

export interface ICreateInviteUserUseCase {
  execute(data: CreateInviteUserDTO): Promise<Invitation>;
}
