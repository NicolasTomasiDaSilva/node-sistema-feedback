"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Checklist = void 0;
const entity_1 = require("./entity");
class Checklist extends entity_1.Entity {
    constructor({ id, companyId, tittle }) {
        super({ id: id });
        this._companyId = companyId;
        this._tittle = tittle;
    }
    get companyId() {
        return this._companyId;
    }
    get tittle() {
        return this._tittle;
    }
}
exports.Checklist = Checklist;
