// import { CreationAttributes } from "sequelize";
// import { Invitation } from "../../../../domain/entities/invitation";
// import { InvitationModel } from "../models/invitation";

// export class InvitationMapper {
//   static toEntity(model: InvitationModel): Invitation {
//     // return new Invitation(
//     //   model.id,
//     //   model.email,
//     //   model.token,
//     //   model.expiresAt,
//     //   model.createdAt,
//     //   model.updatedAt
//     // );
//   }

//   static toPersistence(
//     entity: Invitation
//   ): CreationAttributes<InvitationModel> {
//     return {
//       id: entity.id,
//       companyId: entity.companyId,
//       name: entity.name,
//       role: entity.role,
//       isAccepted: entity.isAccepted,
//       createdAt: entity.createdAt,
//       updatedAt: entity.updatedAt,
//       deletedAt: entity.deletedAt,
//     };
//   }
// }
