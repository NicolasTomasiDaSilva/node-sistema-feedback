"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Checklist = void 0;
const entity_1 = require("./entity");
class Checklist extends entity_1.Entity {
    constructor(props) {
        super({
            id: props.id,
            createdAt: props.createdAt,
            updatedAt: props.updatedAt,
            deletedAt: props.deletedAt,
        });
        this._companyId = props.companyId;
        this._title = props.title;
    }
    static create(props) {
        const now = new Date();
        return new Checklist(Object.assign(Object.assign({}, props), { createdAt: now, updatedAt: now, deletedAt: null }));
    }
    static fromPersistence(props) {
        return new Checklist(props);
    }
    get companyId() {
        return this._companyId;
    }
    get title() {
        return this._title;
    }
}
exports.Checklist = Checklist;
