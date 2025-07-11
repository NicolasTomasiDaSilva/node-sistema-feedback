"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUnitOfWork = void 0;
const unit_of_work_1 = require("../../../infrastructure/database/sequelize/unit-of-work");
const uuid_adapter_1 = require("../../../infrastructure/adapters/uuid-adapter");
const makeUnitOfWork = () => {
    const uuidGenerator = new uuid_adapter_1.UuidAdapter();
    return new unit_of_work_1.SequelizeUnitOfWork(uuidGenerator);
};
exports.makeUnitOfWork = makeUnitOfWork;
//# sourceMappingURL=make-unit-of-work.js.map