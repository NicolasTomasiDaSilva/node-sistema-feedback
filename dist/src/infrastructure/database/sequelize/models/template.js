"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateModel = void 0;
const sequelize_1 = require("sequelize");
const company_1 = require("./company");
const template_item_1 = require("./template-item");
class TemplateModel extends sequelize_1.Model {
    static initModel(sequelize) {
        TemplateModel.init({
            id: {
                type: sequelize_1.DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
            },
            companyId: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
            },
            title: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            createdAt: sequelize_1.DataTypes.DATE,
            updatedAt: sequelize_1.DataTypes.DATE,
            deletedAt: { type: sequelize_1.DataTypes.DATE, allowNull: true },
        }, {
            sequelize,
            tableName: "templates",
            timestamps: true,
            paranoid: true,
        });
    }
    static associate() {
        TemplateModel.belongsTo(company_1.CompanyModel, {
            foreignKey: "companyId",
            as: "company",
        });
        TemplateModel.hasMany(template_item_1.TemplateItemModel, {
            foreignKey: "templateId",
            as: "items",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
    }
}
exports.TemplateModel = TemplateModel;
//# sourceMappingURL=template.js.map