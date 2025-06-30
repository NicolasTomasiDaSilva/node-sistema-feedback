import {
  BelongsToGetAssociationMixin,
  DataTypes,
  HasManyGetAssociationsMixin,
  Model,
  NonAttribute,
  Sequelize,
} from "sequelize";

import { UserModel } from "./user";
import { FeedbackItemModel } from "./feedback-item";
import { CompanyModel } from "./company";

export interface FeedbackAttributes {
  /* ─────────── Colunas da tabela ─────────── */
  id: string;
  giverId: string;
  receiverId: string;
  companyId: string;
  title: string;
  description: string | null;
  observation: string | null;
  score: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class FeedbackModel
  extends Model<FeedbackAttributes>
  implements FeedbackAttributes
{
  /* ─────────── Colunas da tabela ─────────── */
  declare id: string;
  declare giverId: string;
  declare receiverId: string;
  declare companyId: string;
  declare title: string;
  declare description: string | null;
  declare observation: string | null;
  declare score: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date | null;

  /* ── Associações (mixins lazy) ── */
  declare getItems: HasManyGetAssociationsMixin<FeedbackItemModel>;

  /* ── Propriedade carregada via include ── */
  declare items?: NonAttribute<FeedbackItemModel[]>;

  static initModel(sequelize: Sequelize) {
    FeedbackModel.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
        },
        giverId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        receiverId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        companyId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        observation: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        score: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: { type: DataTypes.DATE, allowNull: true },
      },
      {
        sequelize,
        tableName: "feedbacks",
        timestamps: true,
        paranoid: true,
      }
    );
  }
  static associate() {
    FeedbackModel.belongsTo(UserModel, {
      foreignKey: "giverId",
      as: "giver",
    });
    FeedbackModel.belongsTo(UserModel, {
      foreignKey: "receiverId",
      as: "receiver",
    });
    FeedbackModel.belongsTo(CompanyModel, {
      foreignKey: "companyId",
      as: "company",
    });
    FeedbackModel.hasMany(FeedbackItemModel, {
      foreignKey: "feedbackId",
      as: "items",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  }
}
