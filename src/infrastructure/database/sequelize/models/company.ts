import {
  DataTypes,
  HasManyGetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Optional,
  Sequelize,
} from "sequelize";
import { Database } from "../sequelize";
import { RoleEnum } from "../../../../domain/enums/role-enum";
import { UserModel } from "./user";
import { InvitationModel } from "./invitation";

export class CompanyModel extends Model<
  InferAttributes<CompanyModel>,
  InferCreationAttributes<CompanyModel>
> {
  public id!: string;
  public name!: string;
  public cpfCnpj!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt!: Date | null;

  public getUsers!: HasManyGetAssociationsMixin<UserModel>;
  public getInvitations!: HasManyGetAssociationsMixin<InvitationModel>;

  static initModel(sequelize: Sequelize) {
    CompanyModel.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        cpfCnpj: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: { type: DataTypes.DATE, allowNull: true },
      },
      {
        sequelize,
        tableName: "companies",
        timestamps: true,
        paranoid: true,
      }
    );
  }

  static associate() {
    CompanyModel.hasMany(UserModel, {
      foreignKey: "companyId",
      as: "users",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    CompanyModel.hasMany(InvitationModel, {
      foreignKey: "companyId",
      as: "invitations",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  }
}
