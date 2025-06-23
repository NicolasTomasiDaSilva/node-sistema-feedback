"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Invitation = void 0;
const entity_1 = require("./entity");
class Invitation extends entity_1.Entity {
    constructor({ id, companyId, name, role }) {
        super({ id: id });
        this._companyId = companyId;
        this._name = name;
        this._role = role;
        this._isAccepted = false;
    }
    get companyId() {
        return this._companyId;
    }
    get name() {
        return this._name;
    }
    get role() {
        return this._role;
    }
    get isAccepted() {
        return this._isAccepted;
    }
}
exports.Invitation = Invitation;
