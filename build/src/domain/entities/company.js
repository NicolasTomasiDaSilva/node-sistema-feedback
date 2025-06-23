"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Company = void 0;
const entity_1 = require("./entity");
class Company extends entity_1.Entity {
    constructor({ id, name, cpfCnpj, settings }) {
        super({ id: id });
        this._name = name;
        this._cpfCnpj = cpfCnpj;
        this._settings = settings;
        this._invitations = [];
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
