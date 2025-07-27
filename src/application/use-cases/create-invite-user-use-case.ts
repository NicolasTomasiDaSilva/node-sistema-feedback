import { Invitation } from "../../domain/entities/invitation";
import { RoleEnum } from "../../domain/enums/role-enum";
import { ForbiddenError } from "../../domain/errors/errors";
import { CreateInviteUserDTO } from "../dtos/create-invite-user-dto";

import { IUnitOfWork } from "../protocols/repositories/unit-of-work";
import { ICreateInviteUserUseCase } from "../protocols/use-cases/create-invite-user-use-case";
import { IUuidGenerator } from "../protocols/uuid-generator";

export class CreateInviteUserUseCase implements ICreateInviteUserUseCase {
  constructor(
    private readonly unitOfWork: IUnitOfWork,
    private readonly uuidGenerator: IUuidGenerator
  ) {}

  async execute(data: CreateInviteUserDTO): Promise<Invitation> {
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
