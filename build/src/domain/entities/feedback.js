"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feedback = void 0;
const entity_1 = require("./entity");
class Feedback extends entity_1.Entity {
    constructor({ id, userId, checklistId, checklist, tittle, description, observation, score, }) {
        super({ id: id });
        this._userId = userId;
        this._checklistId = checklistId;
        this._checklist = checklist;
        this._tittle = tittle;
        this._description = description !== null && description !== void 0 ? description : null;
        this._observation = observation !== null && observation !== void 0 ? observation : null;
        this._score = score;
    }
    get userId() {
        return this._userId;
    }
    get checklistId() {
        return this._checklistId;
    }
    get checklist() {
        return this._checklist;
    }
    get tittle() {
        return this._tittle;
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
