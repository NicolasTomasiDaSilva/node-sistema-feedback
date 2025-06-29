import { IInvitationRepository } from "../../../../application/protocols/repositories/invite-repository";
import { Invitation } from "../../../../domain/entities/invitation";
import { InvitationMapper } from "../mappers/invitation-mapper";
import { InvitationModel } from "../models/invitation";

export class SequelizeInvitationRepository implements IInvitationRepository {
  async create(data: Invitation): Promise<Invitation> {
    const model = InvitationMapper.toPersistence(data);
    const created = await InvitationModel.create(model);
    return InvitationMapper.toEntity(created);
  }
}
