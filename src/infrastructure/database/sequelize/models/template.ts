import {
  DataTypes,
  HasManyGetAssociationsMixin,
  Model,
  NonAttribute,
  Sequelize,
} from "sequelize";
import { CompanyModel } from "./company";
import { TemplateItemModel } from "./template-item";

export interface TemplateAttributes {
  /* ─────────── Colunas da tabela ─────────── */
  id: string;
  companyId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class TemplateModel
  extends Model<TemplateAttributes>
  implements TemplateAttributes
{
  /* ─────────── Colunas da tabela ─────────── */
  declare id: string;
  declare companyId: string;
  declare title: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date | null;

  /* ── Associações (mixins lazy) ── */
  declare getItems: HasManyGetAssociationsMixin<TemplateItemModel>;

  /* ── Propriedade carregada via include ── */
  declare items?: NonAttribute<TemplateItemModel[]>;

  static initModel(sequelize: Sequelize) {
    TemplateModel.init(
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
        tableName: "templates",
        timestamps: true,
        paranoid: true,
      }
    );
  }

  static associate() {
    TemplateModel.belongsTo(CompanyModel, {
      foreignKey: "companyId",
      as: "company",
    });
    TemplateModel.hasMany(TemplateItemModel, {
      foreignKey: "templateId",
      as: "items",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  }
}
