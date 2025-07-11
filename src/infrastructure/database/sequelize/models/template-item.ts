import { DataTypes, Model, Sequelize } from "sequelize";

import { TemplateModel } from "./template";

export interface TemplateItemAttributes {
  /* ─────────── Colunas da tabela ─────────── */
  id: string;
  templateId: string;
  label: string;
  description: string | null;
  weight: number;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class TemplateItemModel
  extends Model<TemplateItemAttributes>
  implements TemplateItemAttributes
{
  /* ─────────── Colunas da tabela ─────────── */
  declare id: string;
  declare templateId: string;
  declare label: string;
  declare description: string | null;
  declare weight: number;
  declare order: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date | null;

  static initModel(sequelize: Sequelize) {
    TemplateItemModel.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
        },
        templateId: {
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
        tableName: "template_items",
        timestamps: true,
        paranoid: true,
      }
    );
  }

  static associate() {
    TemplateItemModel.belongsTo(TemplateModel, {
      foreignKey: "templateId",
      as: "template",
    });
  }
}
