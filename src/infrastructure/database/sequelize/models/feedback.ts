import {
  BelongsToGetAssociationMixin,
  DataTypes,
  HasManyGetAssociationsMixin,
  Model,
  Sequelize,
} from "sequelize";

import { UserModel } from "./user";
import { FeedbackItemModel } from "./feedback-item";

export interface FeedbackAttributes {
  /* ─────────── Colunas da tabela ─────────── */
  id: string;
  giverId: string;
  receiverId: string;
  checklistId: string;
  title: string;
  description: string | null;
  observation: string | null;
  score: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class FeedbackModel
  extends Model<FeedbackAttributes>
  implements FeedbackAttributes
{
  /* ─────────── Colunas da tabela ─────────── */
  declare id: string;
  declare giverId: string;
  declare receiverId: string;
  declare checklistId: string;
  declare title: string;
  declare description: string | null;
  declare observation: string | null;
  declare score: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date | null;
  declare items?: FeedbackItemModel[] | undefined;

  declare getItems?: HasManyGetAssociationsMixin<FeedbackItemModel>;
  declare getGiver?: BelongsToGetAssociationMixin<UserModel>;
  declare getReceiver?: BelongsToGetAssociationMixin<UserModel>;
  // declare getChecklist!: BelongsToGetAssociationMixin<ChecklistModel>;

  static initModel(sequelize: Sequelize) {
    FeedbackModel.init(
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
        giverId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        receiverId: {
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
        observation: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        score: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: { type: DataTypes.DATE, allowNull: true },
      },
      {
        sequelize,
        tableName: "feedbacks",
        timestamps: true,
        paranoid: true,
      }
    );
  }
  static associate() {
    FeedbackModel.belongsTo(UserModel, {
      foreignKey: "giverId",
      as: "giver",
    });
    FeedbackModel.belongsTo(UserModel, {
      foreignKey: "receiverId",
      as: "receiver",
    });
    FeedbackModel.hasMany(FeedbackItemModel, {
      foreignKey: "feedbackId",
      as: "items",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    // FeedbackModel.belongsTo(UserModel, {
    //   foreignKey: "checklistId",
    //   as: "checklist",
    // });
  }
}
