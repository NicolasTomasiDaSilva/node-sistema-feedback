"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackModel = void 0;
const sequelize_1 = require("sequelize");
const user_1 = require("./user");
class FeedbackModel extends sequelize_1.Model {
    // public getChecklist!: BelongsToGetAssociationMixin<ChecklistModel>;
    static initModel(sequelize) {
        FeedbackModel.init({
            id: {
                type: sequelize_1.DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
            },
            checklistId: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
            },
            giverId: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
            },
            receiverId: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
            },
            title: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
            observation: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
            score: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            createdAt: sequelize_1.DataTypes.DATE,
            updatedAt: sequelize_1.DataTypes.DATE,
            deletedAt: { type: sequelize_1.DataTypes.DATE, allowNull: true },
        }, {
            sequelize,
            tableName: "feedbacks",
            timestamps: true,
            paranoid: true,
        });
    }
    static associate() {
        FeedbackModel.belongsTo(user_1.UserModel, {
            foreignKey: "giverId",
            as: "giver",
        });
        FeedbackModel.belongsTo(user_1.UserModel, {
            foreignKey: "receiverId",
            as: "receiver",
        });
        // FeedbackModel.belongsTo(UserModel, {
        //   foreignKey: "checklistId",
        //   as: "checklist",
        // });
    }
}
exports.FeedbackModel = FeedbackModel;
