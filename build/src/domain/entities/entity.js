"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
class Entity {
    constructor({ id }) {
        this._id = id;
        this._createdAt = new Date();
        this._updatedAt = new Date();
        this._deletedAt = null;
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
}
exports.Entity = Entity;
