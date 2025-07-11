"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const entity_1 = require("./entity");
class User extends entity_1.Entity {
    constructor(props) {
        super({
            id: props.id,
            createdAt: props.createdAt,
            updatedAt: props.updatedAt,
            deletedAt: props.deletedAt,
        });
        this._companyId = props.companyId;
        this._name = props.name;
        this._cpf = props.cpf;
        this._email = props.email;
        this._role = props.role;
    }
    static create(props) {
        const now = new Date();
        return new User(Object.assign(Object.assign({}, props), { createdAt: now, updatedAt: now, deletedAt: null }));
    }
    static fromPersistence(props) {
        return new User(props);
    }
    toJSON() {
        return {
            id: this.id,
            companyId: this._companyId,
            name: this._name,
            cpf: this._cpf,
            email: this._email,
            role: this._role,
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
    get cpf() {
        return this._cpf;
    }
    get email() {
        return this._email;
    }
    get role() {
        return this._role;
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map