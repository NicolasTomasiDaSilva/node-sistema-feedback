"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = void 0;
const entity_1 = require("./entity");
class Settings extends entity_1.Entity {
    constructor({ id, companyId, primaryColor, logoUrl }) {
        super({ id: id });
        this._companyId = companyId;
        this._primaryColor = primaryColor;
        this._logoUrl = logoUrl !== null && logoUrl !== void 0 ? logoUrl : null;
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
