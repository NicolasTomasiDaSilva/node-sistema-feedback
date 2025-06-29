import {
  BelongsToGetAssociationMixin,
  DataTypes,
  Model,
  Optional,
  Sequelize,
} from "sequelize";
import { RoleEnum } from "../../../../domain/enums/role-enum";
import { CompanyModel } from "./company";
import { UserModel } from "./user";

export interface FeedbackAttributes {
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
  public id!: string;
  public giverId!: string;
  public receiverId!: string;
  public checklistId!: string;
  public title!: string;
  public description!: string | null;
  public observation!: string | null;
  public score!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt!: Date | null;

  public getGiver?: BelongsToGetAssociationMixin<UserModel>;
  public getReceiver?: BelongsToGetAssociationMixin<UserModel>;
  // public getChecklist!: BelongsToGetAssociationMixin<ChecklistModel>;

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
    // FeedbackModel.belongsTo(UserModel, {
    //   foreignKey: "checklistId",
    //   as: "checklist",
    // });
  }
}
