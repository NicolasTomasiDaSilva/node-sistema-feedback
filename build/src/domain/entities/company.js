"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Company = void 0;
const entity_1 = require("./entity");
class Company extends entity_1.Entity {
    constructor({ id, name, cpfCnpj, settings, invitations, createdAt, updatedAt, deletedAt, }) {
        super({ id, createdAt, updatedAt, deletedAt });
        this._name = name;
        this._cpfCnpj = cpfCnpj;
        this._settings = settings;
        this._invitations = invitations;
    }
    static create(props) {
        const now = new Date();
        return new Company(Object.assign(Object.assign({}, props), { createdAt: now, updatedAt: now, deletedAt: null }));
    }
    static fromPersistence(props) {
        return new Company(props);
    }
    get name() {
        return this._name;
    }
    get cpfCnpj() {
        return this._cpfCnpj;
    }
    get settings() {
        return this._settings;
    }
    get invitations() {
        return this._invitations;
    }
}
exports.Company = Company;
