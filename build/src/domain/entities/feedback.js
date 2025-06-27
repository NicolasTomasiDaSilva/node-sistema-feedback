"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feedback = void 0;
const entity_1 = require("./entity");
class Feedback extends entity_1.Entity {
    constructor(props) {
        super({
            id: props.id,
            createdAt: props.createdAt,
            updatedAt: props.updatedAt,
            deletedAt: props.deletedAt,
        });
        this._giverId = props.giverId;
        this._receiverId = props.receiverId;
        this._checklistId = props.checklistId;
        this._checklist = props.checklist;
        this._title = props.title;
        this._description = props.description;
        this._observation = props.observation;
        this._score = props.score;
    }
    static create(props) {
        const now = new Date();
        return new Feedback(Object.assign(Object.assign({}, props), { createdAt: now, updatedAt: now, deletedAt: null }));
    }
    static fromPersistence(props) {
        return new Feedback(props);
    }
    get giverId() {
        return this._giverId;
    }
    get receiverId() {
        return this._receiverId;
    }
    get checklistId() {
        return this._checklistId;
    }
    get checklist() {
        return this._checklist;
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
}
exports.Feedback = Feedback;
