import {
  BelongsToGetAssociationMixin,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import { CompanyModel } from "./company";

export interface ChecklistItemAttributes {
  id: string;
  checklistId: string;
  label: string;
  description: string | null;
  weight: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class ChecklistItemModel
  extends Model<ChecklistItemAttributes>
  implements ChecklistItemAttributes
{
  public id!: string;
  public checklistId!: string;
  public label!: string;
  public description!: string | null;
  public weight!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt!: Date | null;
  public getChecklist?: BelongsToGetAssociationMixin<ChecklistItemModel>;

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
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: { type: DataTypes.DATE, allowNull: true },
      },
      {
        sequelize,
        tableName: "checklists",
        timestamps: true,
        paranoid: true,
      }
    );
  }

  static associate() {
    ChecklistItemModel.belongsTo(CompanyModel, {
      foreignKey: "checklistId",
      as: "checklist",
    });
  }
}
