"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
class Entity {
    constructor({ id, createdAt, updatedAt, deletedAt }) {
        this._id = id;
        this._createdAt = createdAt;
        this._updatedAt = updatedAt;
        this._deletedAt = deletedAt;
    }
    get id() {
        return this._id;
    }
    get createdAt() {
        return this._createdAt;
    }
    get updatedAt() {
        return this._updatedAt;
    }
    get deletedAt() {
        return this._deletedAt;
    }
    updated() {
        this._updatedAt = new Date();
    }
}
exports.Entity = Entity;
//# sourceMappingURL=entity.js.map