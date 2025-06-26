import {
  BelongsToGetAssociationMixin,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import { Database } from "../sequelize";
import { RoleEnum } from "../../../../domain/enums/role-enum";
import { CompanyModel } from "./company";

export class InvitationModel extends Model<
  InferAttributes<InvitationModel>,
  InferCreationAttributes<InvitationModel>
> {
  public id!: string;
  public companyId!: string;
  public name!: string;
  public role!: RoleEnum;
  public isAccepted!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt!: Date | null;

  public getCompany?: BelongsToGetAssociationMixin<CompanyModel>;

  static initModel(sequelize: Sequelize) {
    InvitationModel.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
        },
        companyId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        role: {
          type: DataTypes.ENUM(...Object.values(RoleEnum)),
          allowNull: false,
        },
        isAccepted: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: { type: DataTypes.DATE, allowNull: true },
      },
      {
        sequelize,
        tableName: "invitations",
        timestamps: true,
        paranoid: true,
      }
    );
  }

  static associate() {
    InvitationModel.belongsTo(CompanyModel, {
      foreignKey: "companyId",
      as: "company",
    });
  }
}
