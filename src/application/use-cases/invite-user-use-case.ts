import { Invitation } from "../../domain/entities/invitation";
import { InviteUserDTO } from "../dtos/invite-user-dto";
import { IInviteUserRepository } from "../protocols/repositories/invite-user-repository";
import { IInviteUserUseCase } from "../protocols/use-cases/invite-user-use-case";
import { IUuidGenerator } from "../protocols/uuid-generator";

export class InviteUserUseCase implements IInviteUserUseCase {
  constructor(
    private readonly inviteUserRepository: IInviteUserRepository,
    private readonly uuidGenerator: IUuidGenerator
  ) {}
  execute(data: InviteUserDTO): Promise<Invitation> {
    const invitation = Invitation.create({
      id: this.uuidGenerator.generate(),
      name: data.name,
      role: data.role,
      companyId: this.uuidGenerator.generate(),
      isAccepted: false,
    });

    return this.inviteUserRepository.create(invitation);
  }
}
