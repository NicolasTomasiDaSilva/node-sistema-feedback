"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyModel = void 0;
const sequelize_1 = require("sequelize");
const feedback_1 = require("./feedback");
const invitation_1 = require("./invitation");
const template_1 = require("./template");
const user_1 = require("./user");
class CompanyModel extends sequelize_1.Model {
    static initModel(sequelize) {
        CompanyModel.init({
            id: {
                type: sequelize_1.DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            cpfCnpj: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            createdAt: sequelize_1.DataTypes.DATE,
            updatedAt: sequelize_1.DataTypes.DATE,
            deletedAt: { type: sequelize_1.DataTypes.DATE, allowNull: true },
        }, {
            sequelize,
            tableName: "companies",
            timestamps: true,
            paranoid: true,
        });
    }
    static associate() {
        CompanyModel.hasMany(user_1.UserModel, {
            foreignKey: "companyId",
            as: "users",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
        CompanyModel.hasMany(invitation_1.InvitationModel, {
            foreignKey: "companyId",
            as: "invitations",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
        CompanyModel.hasMany(template_1.TemplateModel, {
            foreignKey: "companyId",
            as: "templates",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
        CompanyModel.hasMany(feedback_1.FeedbackModel, {
            foreignKey: "companyId",
            as: "feedbacks",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
    }
}
exports.CompanyModel = CompanyModel;
//# sourceMappingURL=company.js.map