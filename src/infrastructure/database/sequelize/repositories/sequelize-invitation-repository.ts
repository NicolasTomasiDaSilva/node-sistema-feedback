import { IInvitationRepository } from "../../../../application/protocols/repositories/invite-repository";
import { Invitation } from "../../../../domain/entities/invitation";
import { InvitationMapper } from "../mappers/invitation-mapper";
import { InvitationModel } from "../models/invitation";
import { Transaction } from "sequelize";

export class SequelizeInvitationRepository implements IInvitationRepository {
  constructor(private transaction?: Transaction) {}

  async create(data: Invitation): Promise<Invitation> {
    const model = InvitationMapper.toPersistence(data);
    const created = await InvitationModel.create(model, {
      transaction: this.transaction,
    });
    return InvitationMapper.toEntity(created);
  }
}
