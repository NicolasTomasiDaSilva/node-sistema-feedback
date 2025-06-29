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
  checklistItemId: string;
  isChecked: boolean;
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
  declare checklistItemId: string;
  declare isChecked: boolean;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date | null;

  /* ── Associações (mixins lazy) ── */
  declare getChecklistItem: BelongsToGetAssociationMixin<ChecklistItemModel>;

  /* ── Propriedade carregada via include ── */
  declare checklistItem: NonAttribute<ChecklistItemModel>;

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
        checklistItemId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        isChecked: {
          type: DataTypes.BOOLEAN,
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
        defaultScope: {
          include: [{ model: ChecklistItemModel, as: "checklistItem" }],
        },
      }
    );
  }

  static associate() {
    FeedbackItemModel.belongsTo(FeedbackModel, {
      foreignKey: "feedbackId",
      as: "feedback",
    });
    FeedbackItemModel.belongsTo(ChecklistItemModel, {
      foreignKey: "checklistItemId",
      as: "checklistItem",
    });
  }
}
