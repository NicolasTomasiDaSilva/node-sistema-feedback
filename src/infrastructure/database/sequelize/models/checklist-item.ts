import {
  BelongsToGetAssociationMixin,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

import { ChecklistModel } from "./checklist";
import { FeedbackItemModel } from "./feedback-item";

export interface ChecklistItemAttributes {
  /* ─────────── Colunas da tabela ─────────── */
  id: string;
  checklistId: string;
  label: string;
  description: string | null;
  weight: number;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class ChecklistItemModel
  extends Model<ChecklistItemAttributes>
  implements ChecklistItemAttributes
{
  /* ─────────── Colunas da tabela ─────────── */
  declare id: string;
  declare checklistId: string;
  declare label: string;
  declare description: string | null;
  declare weight: number;
  declare order: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date | null;

  static initModel(sequelize: Sequelize) {
    ChecklistItemModel.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
        },
        checklistId: {
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
        tableName: "checklist_items",
        timestamps: true,
        paranoid: true,
      }
    );
  }

  static associate() {
    ChecklistItemModel.belongsTo(ChecklistModel, {
      foreignKey: "checklistId",
      as: "checklist",
    });
  }
}
