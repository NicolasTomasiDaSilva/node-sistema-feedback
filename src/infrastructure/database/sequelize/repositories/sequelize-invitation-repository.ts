import { IInvitationRepository } from "../../../../application/protocols/repositories/invite-repository";
import { Invitation } from "../../../../domain/entities/invitation";
import { InvitationMapper } from "../mappers/invitation-mapper";
import { InvitationModel } from "../models/invitation";

export class SequelizeInvitationRepository implements IInvitationRepository {
  async create(data: Invitation): Promise<Invitation> {
    const model = await InvitationModel.create(
      InvitationMapper.toPersistence(data)
    );
    return InvitationMapper.toEntity(model);
  }
}
