"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feedback = void 0;
const errors_1 = require("../errors/errors");
const entity_1 = require("./entity");
class Feedback extends entity_1.Entity {
    constructor(props) {
        if (props.score < 1 || props.score > 100) {
            throw new errors_1.BadRequestError("Score must be between 1 and 100");
        }
        if (props.items && (props.items.length < 1 || props.items.length > 10)) {
            throw new errors_1.BadRequestError("Template Feedback must have between 1 and 10 items");
        }
        super({
            id: props.id,
            createdAt: props.createdAt,
            updatedAt: props.updatedAt,
            deletedAt: props.deletedAt,
        });
        this._giverId = props.giverId;
        this._receiver = props.receiver;
        this._title = props.title;
        this._description = props.description;
        this._observation = props.observation;
        this._score = props.score;
        this._items = props.items;
    }
    static create(props) {
        const now = new Date();
        return new Feedback(Object.assign(Object.assign({}, props), { createdAt: now, updatedAt: now, deletedAt: null }));
    }
    static fromPersistence(props) {
        return new Feedback(props);
    }
    toJSON() {
        return {
            id: this.id,
            giverId: this._giverId,
            receiver: this._receiver.toJSON(),
            title: this._title,
            description: this._description,
            observation: this._observation,
            score: this._score,
            items: this._items ? this._items.map((item) => item.toJSON()) : undefined,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            deletedAt: this.deletedAt,
        };
    }
    get giverId() {
        return this._giverId;
    }
    get receiver() {
        return this._receiver;
    }
    get title() {
        return this._title;
    }
    get description() {
        return this._description;
    }
    get observation() {
        return this._observation;
    }
    get score() {
        return this._score;
    }
    get items() {
        return this._items;
    }
}
exports.Feedback = Feedback;
//# sourceMappingURL=feedback.js.map