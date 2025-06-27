"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = void 0;
const entity_1 = require("./entity");
class Settings extends entity_1.Entity {
    constructor(props) {
        super({
            id: props.id,
            createdAt: props.createdAt,
            updatedAt: props.updatedAt,
            deletedAt: props.deletedAt,
        });
        this._companyId = props.companyId;
        this._primaryColor = props.primaryColor;
        this._logoUrl = props.logoUrl;
    }
    static create(props) {
        const now = new Date();
        return new Settings(Object.assign(Object.assign({}, props), { createdAt: now, updatedAt: now, deletedAt: null }));
    }
    static fromPersistence(props) {
        return new Settings(props);
    }
    get companyId() {
        return this._companyId;
    }
    get primaryColor() {
        return this._primaryColor;
    }
    get logoUrl() {
        return this._logoUrl;
    }
}
exports.Settings = Settings;
