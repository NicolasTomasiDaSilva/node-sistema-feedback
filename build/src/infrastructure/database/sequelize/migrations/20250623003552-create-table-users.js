"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
const sequelize_1 = require("sequelize");
const role_enum_1 = require("../../../../domain/enums/role-enum");
function up(query) {
    return __awaiter(this, void 0, void 0, function* () {
        yield query.createTable("users", {
            id: { type: sequelize_1.DataTypes.UUID, primaryKey: true, allowNull: false },
            name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
            email: { type: sequelize_1.DataTypes.STRING, allowNull: false },
            role: {
                type: sequelize_1.DataTypes.ENUM(...Object.values(role_enum_1.RoleEnum)),
                allowNull: false,
            },
            createdAt: { type: sequelize_1.DataTypes.DATE, allowNull: false },
            updatedAt: { type: sequelize_1.DataTypes.DATE, allowNull: false },
            deletedAt: { type: sequelize_1.DataTypes.DATE, allowNull: true },
        });
    });
}
function down(query) {
    return __awaiter(this, void 0, void 0, function* () {
        yield query.dropTable("users");
    });
}
