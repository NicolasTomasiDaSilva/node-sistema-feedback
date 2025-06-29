import {
  BelongsToGetAssociationMixin,
  DataTypes,
  HasManyGetAssociationsMixin,
  Model,
  Sequelize,
} from "sequelize";
import { CompanyModel } from "./company";
import { ChecklistItemAttributes, ChecklistItemModel } from "./checklist-item";

export interface ChecklistAttributes {
  id: string;
  companyId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  items?: ChecklistItemAttributes[] | undefined;
}

export class ChecklistModel
  extends Model<ChecklistAttributes>
  implements ChecklistAttributes
{
  public id!: string;
  public companyId!: string;
  public title!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt!: Date | null;
  public items?: ChecklistItemModel[] | undefined;
  public getCompany?: BelongsToGetAssociationMixin<CompanyModel>;
  public getItems?: HasManyGetAssociationsMixin<ChecklistItemModel>;

  static initModel(sequelize: Sequelize) {
    ChecklistModel.init(
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
        title: {
          type: DataTypes.STRING,
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
    ChecklistModel.belongsTo(CompanyModel, {
      foreignKey: "companyId",
      as: "company",
    });
    ChecklistModel.hasMany(ChecklistItemModel, {
      foreignKey: "checklistId",
      as: "items",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  }
}
