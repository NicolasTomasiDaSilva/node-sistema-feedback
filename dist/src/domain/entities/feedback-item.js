"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackItem = void 0;
const errors_1 = require("../errors/errors");
class FeedbackItem {
    constructor(props) {
        if (props.weight < 1 || props.weight > 5) {
            throw new errors_1.BadRequestError("Weight must be between 1 and 5");
        }
        this._observation = props.observation;
        this._score = props.score;
        this._label = props.label;
        this._description = props.description;
        this._weight = props.weight;
        this._order = props.order;
    }
    static create(props) {
        return new FeedbackItem(props);
    }
    static fromPersistence(props) {
        return new FeedbackItem({
            observation: props.observation,
            score: props.score,
            label: props.label,
            description: props.description,
            weight: props.weight,
            order: props.order,
        });
    }
    toJSON() {
        return {
            observation: this._observation,
            score: this._score,
            label: this._label,
            description: this._description,
            weight: this._weight,
            order: this._order,
        };
    }
    get score() {
        return this._score;
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
    get observation() {
        return this._observation;
    }
}
exports.FeedbackItem = FeedbackItem;
//# sourceMappingURL=feedback-item.js.map