import { DataTypes, Model, Sequelize } from "sequelize";

import { RoleEnum } from "../../../../domain/enums/role-enum";
import { CompanyModel } from "./company";
import { FeedbackModel } from "./feedback";
import { TemplateModel } from "./template";

/* ─────────── Colunas da tabela ─────────── */
export interface UserAttributes {
  id: string;
  companyId: string;
  name: string;
  cpf: string;
  email: string;
  role: RoleEnum;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class UserModel extends Model<UserAttributes> implements UserAttributes {
  /* ─────────── Colunas da tabela ─────────── */
  declare id: string;
  declare companyId: string;
  declare name: string;
  declare cpf: string;
  declare email: string;
  declare role: RoleEnum;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date | null;

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
        cpf: {
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

    UserModel.hasMany(FeedbackModel, {
      foreignKey: "giverId",
      as: "givenFeedbacks",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    UserModel.hasMany(FeedbackModel, {
      foreignKey: "receiverId",
      as: "receivedFeedbacks",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    UserModel.hasMany(TemplateModel, {
      foreignKey: "creatorId",
      as: "createdTemplates",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  }
}
