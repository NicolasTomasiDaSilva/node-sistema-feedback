import {
  BelongsToGetAssociationMixin,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

import { TemplateFeedbackModel } from "./template-feedback";

export interface TemplateFeedbackItemAttributes {
  /* ─────────── Colunas da tabela ─────────── */
  id: string;
  templateFeedbackId: string;
  label: string;
  description: string | null;
  weight: number;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class TemplateFeedbackItemModel
  extends Model<TemplateFeedbackItemAttributes>
  implements TemplateFeedbackItemAttributes
{
  /* ─────────── Colunas da tabela ─────────── */
  declare id: string;
  declare templateFeedbackId: string;
  declare label: string;
  declare description: string | null;
  declare weight: number;
  declare order: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date | null;

  static initModel(sequelize: Sequelize) {
    TemplateFeedbackItemModel.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
        },
        templateFeedbackId: {
          type: DataTypes.UUID,
          allowNull: false,
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
        tableName: "template_feedback_items",
        timestamps: true,
        paranoid: true,
      }
    );
  }

  static associate() {
    TemplateFeedbackItemModel.belongsTo(TemplateFeedbackModel, {
      foreignKey: "templateFeedbackId",
      as: "templateFeedback",
    });
  }
}
