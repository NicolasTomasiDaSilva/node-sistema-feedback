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
exports.CreateFeedbackUseCase = void 0;
const feedback_1 = require("../../domain/entities/feedback");
const feedback_item_1 = require("../../domain/entities/feedback-item");
const role_enum_1 = require("../../domain/enums/role-enum");
const errors_1 = require("../../domain/errors/errors");
class CreateFeedbackUseCase {
    constructor(unitOfWork, uuidGenerator) {
        this.unitOfWork = unitOfWork;
        this.uuidGenerator = uuidGenerator;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const requiredRoles = [role_enum_1.RoleEnum.manager, role_enum_1.RoleEnum.supervisor];
            if (!requiredRoles.includes(data.currentUser.role)) {
                throw new errors_1.ForbiddenError("Only managers and supervisors can create Feedback");
            }
            try {
                yield this.unitOfWork.start();
                const receiver = yield this.unitOfWork
                    .getUserRepository()
                    .findById(data.receiverId, data.currentUser.companyId);
                if (!receiver) {
                    throw new errors_1.NotFoundError("Receiver not found");
                }
                const feedbackId = this.uuidGenerator.generate();
                const feedback = feedback_1.Feedback.create({
                    id: feedbackId,
                    giverId: data.currentUser.id,
                    receiver: receiver,
                    description: data.description,
                    observation: data.observation,
                    score: data.score,
                    title: data.title,
                    items: data.items.map((item) => {
                        return feedback_item_1.FeedbackItem.create({
                            label: item.label,
                            description: item.description,
                            observation: item.observation,
                            score: item.score,
                            weight: item.weight,
                            order: item.order,
                        });
                    }),
                });
                const createdFeedback = yield this.unitOfWork
                    .getFeedbackRepository()
                    .create(feedback, data.currentUser.companyId);
                yield this.unitOfWork.commit();
                return createdFeedback;
            }
            catch (error) {
                console.log(error);
                yield this.unitOfWork.rollback();
                throw error;
            }
        });
    }
}
exports.CreateFeedbackUseCase = CreateFeedbackUseCase;
//# sourceMappingURL=create-feedback-use-case.js.map