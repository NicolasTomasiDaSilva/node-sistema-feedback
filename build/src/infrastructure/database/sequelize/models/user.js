"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const sequelize_1 = require("sequelize");
const role_enum_1 = require("../../../../domain/enums/role-enum");
const company_1 = require("./company");
const feedback_1 = require("./feedback");
class UserModel extends sequelize_1.Model {
    static initModel(sequelize) {
        UserModel.init({
            id: {
                type: sequelize_1.DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
            },
            companyId: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            role: {
                type: sequelize_1.DataTypes.ENUM(...Object.values(role_enum_1.RoleEnum)),
                allowNull: false,
            },
            createdAt: sequelize_1.DataTypes.DATE,
            updatedAt: sequelize_1.DataTypes.DATE,
            deletedAt: { type: sequelize_1.DataTypes.DATE, allowNull: true },
        }, {
            sequelize,
            tableName: "users",
            timestamps: true,
            paranoid: true,
        });
    }
    static associate() {
        UserModel.belongsTo(company_1.CompanyModel, {
            foreignKey: "companyId",
            as: "company",
        });
        UserModel.hasMany(feedback_1.FeedbackModel, {
            foreignKey: "giverId",
            as: "givenFeedbacks",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
        UserModel.hasMany(feedback_1.FeedbackModel, {
            foreignKey: "receiverId",
            as: "receivedFeedbacks",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
    }
}
exports.UserModel = UserModel;
