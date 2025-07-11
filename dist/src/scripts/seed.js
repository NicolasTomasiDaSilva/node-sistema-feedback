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
const uuid_1 = require("uuid");
const sequelize_1 = require("../infrastructure/database/sequelize/sequelize");
const company_1 = require("../infrastructure/database/sequelize/models/company");
const user_1 = require("../infrastructure/database/sequelize/models/user");
const role_enum_1 = require("../domain/enums/role-enum");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield sequelize_1.Database.connect();
            const [company] = yield company_1.CompanyModel.findOrCreate({
                where: { cpfCnpj: "00000000000" },
                defaults: {
                    id: (0, uuid_1.v4)(),
                    name: "Empresa Padrao",
                    cpfCnpj: "00000000000",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    deletedAt: null,
                },
            });
            yield user_1.UserModel.findOrCreate({
                where: { email: "manager@gmail.com" },
                defaults: {
                    id: (0, uuid_1.v4)(),
                    companyId: company.id,
                    name: "manager name",
                    email: "manager@gmail.com",
                    cpf: "00000000000",
                    role: role_enum_1.RoleEnum.manager,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    deletedAt: null,
                },
            });
            yield user_1.UserModel.findOrCreate({
                where: { email: "supervisor@gmail.com" },
                defaults: {
                    id: (0, uuid_1.v4)(),
                    companyId: company.id,
                    name: "supervisor name",
                    email: "supervisor@gmail.com",
                    cpf: "00000000001",
                    role: role_enum_1.RoleEnum.supervisor,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    deletedAt: null,
                },
            });
            yield user_1.UserModel.findOrCreate({
                where: { email: "employee@gmail.com" },
                defaults: {
                    id: (0, uuid_1.v4)(),
                    companyId: company.id,
                    name: "employee name",
                    email: "employee@gmail.com",
                    cpf: "00000000002",
                    role: role_enum_1.RoleEnum.employee,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    deletedAt: null,
                },
            });
            console.log("Seed completed successfully");
        }
        catch (err) {
            console.error("Seed failed", err);
        }
        finally {
            yield sequelize_1.Database.disconnect();
        }
    });
}
main();
//# sourceMappingURL=seed.js.map