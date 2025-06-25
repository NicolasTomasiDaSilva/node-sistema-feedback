import { CreationAttributes } from "sequelize";
import { Invitation } from "../../../../domain/entities/invitation";
import { InvitationModel } from "../models/invitation";

export class InvitationMapper {
  static toEntity(model: InvitationModel): Invitation {
    return Invitation.fromPersistence({
      id: model.id,
      companyId: model.companyId,
      name: model.name,
      role: model.role,
      isAccepted: model.isAccepted,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      deletedAt: model.deletedAt,
    });
  }

  static toPersistence(
    entity: Invitation
  ): CreationAttributes<InvitationModel> {
    return {
      id: entity.id,
      companyId: entity.companyId,
      name: entity.name,
      role: entity.role,
      isAccepted: entity.isAccepted,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    };
  }
}
