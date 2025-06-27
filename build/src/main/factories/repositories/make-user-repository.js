"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUserRepository = makeUserRepository;
const sequelize_user_repository_copy_1 = require("../../../infrastructure/database/sequelize/repositories/sequelize-user-repository copy");
function makeUserRepository() {
    return new sequelize_user_repository_copy_1.SequelizeUserRepository();
}
