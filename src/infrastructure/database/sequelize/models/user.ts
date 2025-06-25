import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { Database } from "../sequelize";
import { RoleEnum } from "../../../../domain/enums/role-enum";
import { CompanyModel } from "./company";

const sequelize = Database.getInstance();

interface UserAttributes {
  id: string;
  companyId: string;
  name: string;
  email: string;
  role: RoleEnum;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class UserModel extends Model<UserAttributes> implements UserAttributes {
  public id!: string;
  public companyId!: string;
  public name!: string;
  public email!: string;
  public role!: RoleEnum;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt!: Date | null;

  static initModel(sequelize: Sequelize) {
    UserModel.init(
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
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        role: {
          type: DataTypes.ENUM(...Object.values(RoleEnum)),
          allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: { type: DataTypes.DATE, allowNull: true },
      },
      {
        sequelize,
        tableName: "users",
        timestamps: true,
        paranoid: true,
      }
    );
  }
  static associate() {
    UserModel.belongsTo(CompanyModel, {
      foreignKey: "companyId",
      as: "company",
    });
  }
}
