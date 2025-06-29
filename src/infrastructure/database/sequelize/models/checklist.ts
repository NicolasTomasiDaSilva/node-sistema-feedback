import {
  BelongsToGetAssociationMixin,
  DataTypes,
  HasManyGetAssociationsMixin,
  Model,
  NonAttribute,
  Sequelize,
} from "sequelize";
import { CompanyModel } from "./company";
import { ChecklistItemAttributes, ChecklistItemModel } from "./checklist-item";

export interface ChecklistAttributes {
  /* ─────────── Colunas da tabela ─────────── */
  id: string;
  companyId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class ChecklistModel
  extends Model<ChecklistAttributes>
  implements ChecklistAttributes
{
  /* ─────────── Colunas da tabela ─────────── */
  declare id: string;
  declare companyId: string;
  declare title: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date | null;

  /* ── Associações (mixins lazy) ── */
  declare getItems: HasManyGetAssociationsMixin<ChecklistItemModel>;

  /* ── Propriedade carregada via include ── */
  declare items?: NonAttribute<ChecklistItemModel[]>;

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
