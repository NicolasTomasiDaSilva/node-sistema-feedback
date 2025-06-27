"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Invitation = void 0;
const entity_1 = require("./entity");
class Invitation extends entity_1.Entity {
    constructor(props) {
        super({
            id: props.id,
            createdAt: props.createdAt,
            updatedAt: props.updatedAt,
            deletedAt: props.deletedAt,
        });
        this._companyId = props.companyId;
        this._name = props.name;
        this._role = props.role;
        this._isAccepted = props.isAccepted;
    }
    static create(props) {
        const now = new Date();
        return new Invitation(Object.assign(Object.assign({}, props), { createdAt: now, updatedAt: now, deletedAt: null }));
    }
    static fromPersistence(props) {
        return new Invitation(props);
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
