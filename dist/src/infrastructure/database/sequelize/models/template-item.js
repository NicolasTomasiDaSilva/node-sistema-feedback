"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateItemModel = void 0;
const sequelize_1 = require("sequelize");
const template_1 = require("./template");
class TemplateItemModel extends sequelize_1.Model {
    static initModel(sequelize) {
        TemplateItemModel.init({
            id: {
                type: sequelize_1.DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
            },
            templateId: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
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
            tableName: "template_items",
            timestamps: true,
            paranoid: true,
        });
    }
    static associate() {
        TemplateItemModel.belongsTo(template_1.TemplateModel, {
            foreignKey: "templateId",
            as: "template",
        });
    }
}
exports.TemplateItemModel = TemplateItemModel;
//# sourceMappingURL=template-item.js.map