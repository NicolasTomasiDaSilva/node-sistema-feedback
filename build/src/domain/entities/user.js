"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const entity_1 = require("./entity");
class User extends entity_1.Entity {
    constructor({ id, name, email, role }) {
        super({ id: id });
        this._name = name;
        this._email = email;
        this._role = role;
        this._feedbacks = [];
    }
    get name() {
        return this._name;
    }
    get email() {
        return this._email;
    }
    get role() {
        return this._role;
    }
    get feedbacks() {
        return this._feedbacks;
    }
}
exports.User = User;
