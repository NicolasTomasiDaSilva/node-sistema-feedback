import { DataTypes, Model, Sequelize } from "sequelize";

import { FeedbackModel } from "./feedback";
import { InvitationModel } from "./invitation";
import { TemplateFeedbackModel } from "./template-feedback";
import { UserModel } from "./user";

export interface CompanyAttributes {
  /* ─────────── Colunas da tabela ─────────── */
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
  declare id: string;
  declare name: string;
  declare cpfCnpj: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date | null;

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
    CompanyModel.hasMany(TemplateFeedbackModel, {
      foreignKey: "companyId",
      as: "templateFeedbacks",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    CompanyModel.hasMany(FeedbackModel, {
      foreignKey: "companyId",
      as: "feedbacks",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  }
}
