import {
  BelongsToGetAssociationMixin,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from "sequelize";
import { FeedbackModel } from "./feedback";
import { ChecklistItemModel } from "./checklist-item";

export interface FeedbackItemAttributes {
  /* ─────────── Colunas da tabela ─────────── */
  id: string;
  feedbackId: string;
  score: number;
  observation: string | null;
  label: string;
  description: string | null;
  weight: number;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class FeedbackItemModel
  extends Model<FeedbackItemAttributes>
  implements FeedbackItemAttributes
{
  /* ─────────── Colunas da tabela ─────────── */
  declare id: string;
  declare feedbackId: string;
  declare score: number;
  declare observation: string | null;
  declare label: string;
  declare description: string | null;
  declare weight: number;
  declare order: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date | null;

  static initModel(sequelize: Sequelize) {
    FeedbackItemModel.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
        },
        feedbackId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        score: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        observation: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        label: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        weight: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        order: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: { type: DataTypes.DATE, allowNull: true },
      },
      {
        sequelize,
        tableName: "feedback_items",
        timestamps: true,
        paranoid: true,
      }
    );
  }

  static associate() {
    FeedbackItemModel.belongsTo(FeedbackModel, {
      foreignKey: "feedbackId",
      as: "feedback",
    });
  }
}
