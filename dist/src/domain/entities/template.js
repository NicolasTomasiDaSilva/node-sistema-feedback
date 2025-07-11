"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Template = void 0;
const errors_1 = require("../errors/errors");
const entity_1 = require("./entity");
class Template extends entity_1.Entity {
    constructor(props) {
        if (props.items && (props.items.length < 1 || props.items.length > 10)) {
            throw new errors_1.BadRequestError("Template must have between 1 and 10 items");
        }
        super({
            id: props.id,
            createdAt: props.createdAt,
            updatedAt: props.updatedAt,
            deletedAt: props.deletedAt,
        });
        this._title = props.title;
        this._items = props.items;
    }
    static create(props) {
        const now = new Date();
        return new Template(Object.assign(Object.assign({}, props), { createdAt: now, updatedAt: now, deletedAt: null }));
    }
    static fromPersistence(props) {
        return new Template(props);
    }
    toJSON() {
        return {
            id: this.id,
            title: this._title,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            deletedAt: this.deletedAt,
            items: this._items ? this._items.map((item) => item.toJSON()) : undefined,
        };
    }
    get title() {
        return this._title;
    }
    get items() {
        return this._items;
    }
    set items(items) {
        if (items.length < 1 || items.length > 10) {
            throw new errors_1.BadRequestError("Template must have between 1 and 10 items");
        }
        this._items = items;
        this.updated();
    }
    set title(title) {
        this._title = title;
        this.updated();
    }
}
exports.Template = Template;
//# sourceMappingURL=template.js.map