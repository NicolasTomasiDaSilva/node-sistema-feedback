import { IInviteUserRepository } from "../../../../application/protocols/repositories/invite-user-repository";
import { Invitation } from "../../../../domain/entities/invitation";
import { InvitationMapper } from "../mappers/invitation-mapper";
import { InvitationModel } from "../models/invitation";

export class SequelizeInviteUserRepository implements IInviteUserRepository {
  async create(data: Invitation): Promise<Invitation> {
    const model = await InvitationModel.create(
      InvitationMapper.toPersistence(data)
    );
    return InvitationMapper.toEntity(model);
  }
}
