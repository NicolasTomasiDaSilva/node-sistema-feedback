import { Invitation } from "../../domain/entities/invitation";
import { InviteUserDTO } from "../dtos/invite-user-dto";
import { IInvitationRepository } from "../protocols/repositories/invite-repository";

import { IInviteUserUseCase } from "../protocols/use-cases/invite-user-use-case";
import { IUuidGenerator } from "../protocols/uuid-generator";

export class InviteUserUseCase implements IInviteUserUseCase {
  constructor(
    private readonly invitationRepository: IInvitationRepository,
    private readonly uuidGenerator: IUuidGenerator
  ) {}
  execute(data: InviteUserDTO): Promise<Invitation> {
    const invitation = Invitation.create({
      id: this.uuidGenerator.generate(),
      name: data.name,
      role: data.role,
      companyId: data.currentUser.companyId,
      isAccepted: false,
    });

    return this.invitationRepository.create(invitation);
  }
}
