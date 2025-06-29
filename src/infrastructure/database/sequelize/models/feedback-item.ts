import {
  BelongsToGetAssociationMixin,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import { CompanyModel } from "./company";
import { FeedbackModel } from "./feedback";
import { Checklist } from "../../../../domain/entities/checklist";
import { ChecklistItem } from "../../../../domain/entities/checklist-item";
import { ChecklistItemModel } from "./checklist-item";

export interface FeedbackItemAttributes {
  id: string;
  feedbackId: string;
  checklistItemId: string;
  isChecked: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  checklistItem?: ChecklistItemModel;
}

export class FeedbackItemModel
  extends Model<FeedbackItemAttributes>
  implements FeedbackItemAttributes
{
  public id!: string;
  public feedbackId!: string;
  public checklistItemId!: string;
  public isChecked!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt!: Date | null;
  public checklistItem?: ChecklistItemModel;
  public getChecklistItem!: BelongsToGetAssociationMixin<ChecklistItemModel>;

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
