"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateItem = void 0;
const errors_1 = require("../errors/errors");
class TemplateItem {
    constructor(props) {
        if (props.weight < 1 || props.weight > 5) {
            throw new errors_1.BadRequestError("Weight must be between 1 and 5");
        }
        this._label = props.label;
        this._description = props.description;
        this._weight = props.weight;
        this._order = props.order;
    }
    static create(props) {
        return new TemplateItem(props);
    }
    static fromPersistence(props) {
        return new TemplateItem({
            label: props.label,
            description: props.description,
            weight: props.weight,
            order: props.order,
        });
    }
    toJSON() {
        return {
            label: this._label,
            description: this._description,
            weight: this._weight,
            order: this._order,
        };
    }
    get label() {
        return this._label;
    }
    get description() {
        return this._description;
    }
    get weight() {
        return this._weight;
    }
    get order() {
        return this._order;
    }
}
exports.TemplateItem = TemplateItem;
//# sourceMappingURL=template-item.js.map