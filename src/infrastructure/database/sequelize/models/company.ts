import { DataTypes, Model, Optional } from "sequelize";
import { Database } from "../sequelize";
import { RoleEnum } from "../../../../domain/enums/role-enum";
import { UserModel } from "./user";
import { InvitationModel } from "./invitation";

const sequelize = Database.getInstance();

interface CompanyAttributes {
  id: string;
  name: string;
  cpfCnpj: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class CompanyModel
  extends Model<CompanyAttributes>
  implements CompanyAttributes
{
  public id!: string;
  public name!: string;
  public cpfCnpj!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt!: Date | null;
}

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
