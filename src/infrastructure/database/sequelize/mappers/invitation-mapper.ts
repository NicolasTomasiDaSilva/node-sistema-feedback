import { InferAttributes } from "sequelize";
import { Invitation } from "../../../../domain/entities/invitation";
import { InvitationModel } from "../models/invitation";

export class InvitationMapper {
  static toEntity(model: InvitationModel): Invitation {
    return Invitation.fromPersistence({
      id: model.id,
      companyId: model.companyId,
      name: model.name,
      phone: model.phone,
      cpf: model.cpf,
      role: model.role,
      isAccepted: model.isAccepted,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      deletedAt: model.deletedAt,
    });
  }

  static toEntityList(models: InvitationModel[]): Invitation[] {
    return models.map((m) => this.toEntity(m));
  }

  static toPersistence(entity: Invitation): InferAttributes<InvitationModel> {
    return {
      id: entity.id,
      companyId: entity.companyId,
      name: entity.name,
      phone: entity.phone,
      cpf: entity.cpf,
      role: entity.role,
      isAccepted: entity.isAccepted,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    };
  }

  static toPersistenceList(
    entities: Invitation[]
  ): InferAttributes<InvitationModel>[] {
    return entities.map((e) => this.toPersistence(e));
  }
}
