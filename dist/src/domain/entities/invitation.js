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
        this._phone = props.phone;
        this._cpf = props.cpf;
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
    toJSON() {
        return {
            id: this.id,
            companyId: this.companyId,
            name: this.name,
            phone: this.phone,
            cpf: this.cpf,
            role: this.role,
            isAccepted: this.isAccepted,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            deletedAt: this.deletedAt,
        };
    }
    get companyId() {
        return this._companyId;
    }
    get name() {
        return this._name;
    }
    get phone() {
        return this._phone;
    }
    get cpf() {
        return this._cpf;
    }
    get role() {
        return this._role;
    }
    get isAccepted() {
        return this._isAccepted;
    }
}
exports.Invitation = Invitation;
//# sourceMappingURL=invitation.js.map