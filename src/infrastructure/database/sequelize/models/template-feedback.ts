import {
  BelongsToGetAssociationMixin,
  DataTypes,
  HasManyGetAssociationsMixin,
  Model,
  NonAttribute,
  Sequelize,
} from "sequelize";
import { CompanyModel } from "./company";
import { TemplateFeedbackItemModel } from "./template-feedback-item";

export interface TemplateFeedbackAttributes {
  /* ─────────── Colunas da tabela ─────────── */
  id: string;
  companyId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class TemplateFeedbackModel
  extends Model<TemplateFeedbackAttributes>
  implements TemplateFeedbackAttributes
{
  /* ─────────── Colunas da tabela ─────────── */
  declare id: string;
  declare companyId: string;
  declare title: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date | null;

  /* ── Associações (mixins lazy) ── */
  declare getItems: HasManyGetAssociationsMixin<TemplateFeedbackItemModel>;

  /* ── Propriedade carregada via include ── */
  declare items?: NonAttribute<TemplateFeedbackItemModel[]>;

  static initModel(sequelize: Sequelize) {
    TemplateFeedbackModel.init(
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
        tableName: "template_feedbacks",
        timestamps: true,
        paranoid: true,
      }
    );
  }

  static associate() {
    TemplateFeedbackModel.belongsTo(CompanyModel, {
      foreignKey: "companyId",
      as: "company",
    });
    TemplateFeedbackModel.hasMany(TemplateFeedbackItemModel, {
      foreignKey: "templateFeedbackId",
      as: "items",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  }
}
