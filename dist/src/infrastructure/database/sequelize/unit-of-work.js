"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeUnitOfWork = void 0;
const sequelize_feedback_repository_1 = require("./repositories/sequelize-feedback-repository ");
const sequelize_invitation_repository_1 = require("./repositories/sequelize-invitation-repository");
const sequelize_template_repository_1 = require("./repositories/sequelize-template-repository");
const sequelize_user_repository_1 = require("./repositories/sequelize-user-repository");
const sequelize_1 = require("./sequelize");
class SequelizeUnitOfWork {
    constructor(uuidGenerator) {
        this.uuidGenerator = uuidGenerator;
        this.transaction = null;
        this._userRepository = null;
        this._feedbackRepository = null;
        this._templateRepository = null;
        this._invitationRepository = null;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.transaction) {
                throw new Error("Transaction already started");
            }
            const sequelize = sequelize_1.Database.getInstance();
            this.transaction = yield sequelize.transaction();
        });
    }
    commit() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.transaction) {
                throw new Error("No active transaction to commit");
            }
            yield this.transaction.commit();
            this.transaction = null;
        });
    }
    rollback() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.transaction) {
                throw new Error("No active transaction to rollback");
            }
            yield this.transaction.rollback();
            this.transaction = null;
        });
    }
    getUserRepository() {
        if (!this._userRepository) {
            this._userRepository = new sequelize_user_repository_1.SequelizeUserRepository(this.transaction || undefined);
        }
        return this._userRepository;
    }
    getFeedbackRepository() {
        if (!this._feedbackRepository) {
            this._feedbackRepository = new sequelize_feedback_repository_1.SequelizeFeedbackRepository(this.uuidGenerator, this.transaction || undefined);
        }
        return this._feedbackRepository;
    }
    getTemplateRepository() {
        if (!this._templateRepository) {
            this._templateRepository = new sequelize_template_repository_1.SequelizeTemplateRepository(this.uuidGenerator, this.transaction || undefined);
        }
        return this._templateRepository;
    }
    getInvitationRepository() {
        if (!this._invitationRepository) {
            this._invitationRepository = new sequelize_invitation_repository_1.SequelizeInvitationRepository(this.transaction || undefined);
        }
        return this._invitationRepository;
    }
}
exports.SequelizeUnitOfWork = SequelizeUnitOfWork;
//# sourceMappingURL=unit-of-work.js.map