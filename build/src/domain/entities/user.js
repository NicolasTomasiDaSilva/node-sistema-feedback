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
        this._email = props.email;
        this._role = props.role;
        this._feedbacks = props.feedbacks;
    }
    static create(props) {
        const now = new Date();
        return new User(Object.assign(Object.assign({}, props), { createdAt: now, updatedAt: now, deletedAt: null }));
    }
    static fromPersistence(props) {
        return new User(props);
    }
    get companyId() {
        return this._companyId;
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
