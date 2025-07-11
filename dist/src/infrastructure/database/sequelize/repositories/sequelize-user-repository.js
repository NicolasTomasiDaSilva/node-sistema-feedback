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
exports.SequelizeUserRepository = void 0;
const sequelize_1 = require("sequelize");
const user_mapper_1 = require("../mappers/user-mapper");
const user_1 = require("../models/user");
class SequelizeUserRepository {
    constructor(transaction) {
        this.transaction = transaction;
    }
    findAll(_a) {
        return __awaiter(this, arguments, void 0, function* ({ companyId, page, perPage, name, }) {
            const where = { companyId };
            if (name) {
                where.name = {
                    [sequelize_1.Op.iLike]: `%${name}%`,
                };
            }
            const models = yield user_1.UserModel.findAll({
                where,
                limit: perPage,
                offset: (page - 1) * perPage,
                order: [["name", "ASC"]],
                transaction: this.transaction,
            });
            return models.map((model) => user_mapper_1.UserMapper.toEntity(model));
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = yield user_1.UserModel.findOne({
                where: { email },
                transaction: this.transaction,
            });
            return model ? user_mapper_1.UserMapper.toEntity(model) : null;
        });
    }
    findById(id, companyId) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = yield user_1.UserModel.findOne({
                where: { id, companyId },
                transaction: this.transaction,
            });
            return model ? user_mapper_1.UserMapper.toEntity(model) : null;
        });
    }
}
exports.SequelizeUserRepository = SequelizeUserRepository;
//# sourceMappingURL=sequelize-user-repository.js.map