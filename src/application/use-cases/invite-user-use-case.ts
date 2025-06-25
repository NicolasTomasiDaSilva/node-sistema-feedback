import { Invitation } from "../../domain/entities/invitation";
import { InviteUserDTO } from "../dtos/invite-user-dto";
import { IInviteUserRepository } from "../protocols/repositories/invite-user-repository";
import { IInviteUserUseCase } from "../protocols/use-cases/invite-user-use-case";

export class InviteUserUseCase implements IInviteUserUseCase {
  constructor(private readonly inviteUserRepository: IInviteUserRepository) {}
  execute(data: InviteUserDTO): Promise<Invitation> {
    const invitation = Invitation.create({
      id: "1",
      name: data.name,
      role: data.role,
      companyId: "1",
      isAccepted: false,
    });

    return this.inviteUserRepository.create(invitation);
  }
}
