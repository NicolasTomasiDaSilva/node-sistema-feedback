import { DataTypes, Model, Optional } from "sequelize";
import { Database } from "../sequelize";
import { RoleEnum } from "../../../../domain/enums/role-enum";

const sequelize = Database.getInstance();

interface UserAttributes {
  id: string;
  name: string;
  email: string;
  role: RoleEnum;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export class UserModel extends Model<UserAttributes> implements UserAttributes {
  public id!: string;
  public name!: string;
  public email!: string;
  public role!: RoleEnum;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;
}

UserModel.init(
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
    deletedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
    paranoid: true,
  }
);
