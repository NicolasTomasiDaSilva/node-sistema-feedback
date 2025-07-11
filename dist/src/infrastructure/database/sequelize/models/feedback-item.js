"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackItemModel = void 0;
const sequelize_1 = require("sequelize");
const feedback_1 = require("./feedback");
class FeedbackItemModel extends sequelize_1.Model {
    static initModel(sequelize) {
        FeedbackItemModel.init({
            id: {
                type: sequelize_1.DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
            },
            feedbackId: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
            },
            score: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            observation: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
            label: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
            weight: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            order: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            createdAt: sequelize_1.DataTypes.DATE,
            updatedAt: sequelize_1.DataTypes.DATE,
            deletedAt: { type: sequelize_1.DataTypes.DATE, allowNull: true },
        }, {
            sequelize,
            tableName: "feedback_items",
            timestamps: true,
            paranoid: true,
        });
    }
    static associate() {
        FeedbackItemModel.belongsTo(feedback_1.FeedbackModel, {
            foreignKey: "feedbackId",
            as: "feedback",
        });
    }
}
exports.FeedbackItemModel = FeedbackItemModel;
//# sourceMappingURL=feedback-item.js.map