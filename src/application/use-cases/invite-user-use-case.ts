import { Invitation } from "../../domain/entities/invitation";
import { RoleEnum } from "../../domain/enums/role-enum";
import { BadRequestError, ForbiddenError } from "../../domain/errors/errors";
import { InviteUserDTO } from "../dtos/invite-user-dto";
import { IInvitationRepository } from "../protocols/repositories/invite-repository";

import { IInviteUserUseCase } from "../protocols/use-cases/invite-user-use-case";
import { IUnitOfWork } from "../protocols/repositories/unit-of-work";
import { IUuidGenerator } from "../protocols/uuid-generator";

export class InviteUserUseCase implements IInviteUserUseCase {
  constructor(
    private readonly unitOfWork: IUnitOfWork,
    private readonly uuidGenerator: IUuidGenerator
  ) {}

  async execute(data: InviteUserDTO): Promise<Invitation> {
    if (data.currentUser.role !== RoleEnum.manager) {
      throw new ForbiddenError("Only managers can invite users");
    }
    if (![RoleEnum.supervisor, RoleEnum.employee].includes(data.role)) {
      throw new ForbiddenError(
        `Invited role must be 'supervisor' or 'employee'`
      );
    }

    const invitation = Invitation.create({
      id: this.uuidGenerator.generate(),
      name: data.name,
      role: data.role,
      phone: data.phone,
      cpf: data.cpf,
      companyId: data.currentUser.companyId,
      isAccepted: false,
    });

    const invitationAcceptUrl: string = `http://localhost:3000/accept-invitation/${invitation.id}`;

    try {
      await this.unitOfWork.start();

      const createdInvitation = await this.unitOfWork
        .getInvitationRepository()
        .create(invitation);

      await this.unitOfWork.commit();
      return createdInvitation;
    } catch (error) {
      await this.unitOfWork.rollback();
      throw error;
    }
  }
}
