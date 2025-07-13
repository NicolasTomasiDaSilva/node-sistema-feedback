import {
  BelongsToGetAssociationMixin,
  DataTypes,
  HasManyGetAssociationsMixin,
  Model,
  NonAttribute,
  Sequelize,
} from "sequelize";
import { CompanyModel } from "./company";
import { TemplateItemModel } from "./template-item";
import { UserModel } from "./user";

export interface TemplateAttributes {
  /* ─────────── Colunas da tabela ─────────── */
  id: string;
  companyId: string;
  creatorId: string;
  title: string;
  description: string | null;
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
  declare creatorId: string;
  declare title: string;
  declare description: string | null;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date | null;

  /* ── Associações (mixins lazy) ── */
  declare getCreator: BelongsToGetAssociationMixin<UserModel>;
  declare getItems: HasManyGetAssociationsMixin<TemplateItemModel>;

  /* ── Propriedade carregada via include ── */
  declare creator: NonAttribute<UserModel>;
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
        creatorId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true,
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
    TemplateModel.belongsTo(UserModel, {
      foreignKey: "creatorId",
      as: "creator",
    });
    TemplateModel.hasMany(TemplateItemModel, {
      foreignKey: "templateId",
      as: "items",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  }
}
