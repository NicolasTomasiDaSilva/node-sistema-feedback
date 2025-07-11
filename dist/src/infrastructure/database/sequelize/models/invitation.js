"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvitationModel = void 0;
const sequelize_1 = require("sequelize");
const role_enum_1 = require("../../../../domain/enums/role-enum");
const company_1 = require("./company");
class InvitationModel extends sequelize_1.Model {
    static initModel(sequelize) {
        InvitationModel.init({
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
            phone: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
            cpf: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            role: {
                type: sequelize_1.DataTypes.ENUM(...Object.values(role_enum_1.RoleEnum)),
                allowNull: false,
            },
            isAccepted: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
            },
            createdAt: sequelize_1.DataTypes.DATE,
            updatedAt: sequelize_1.DataTypes.DATE,
            deletedAt: { type: sequelize_1.DataTypes.DATE, allowNull: true },
        }, {
            sequelize,
            tableName: "invitations",
            timestamps: true,
            paranoid: true,
        });
    }
    static associate() {
        InvitationModel.belongsTo(company_1.CompanyModel, {
            foreignKey: "companyId",
            as: "company",
        });
    }
}
exports.InvitationModel = InvitationModel;
//# sourceMappingURL=invitation.js.map