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
exports.SequelizeFeedbackRepository = void 0;
const sequelize_1 = require("sequelize");
const feedback_item_mapper_1 = require("../mappers/feedback-item-mapper");
const feedback_mapper_1 = require("../mappers/feedback-mapper");
const feedback_1 = require("../models/feedback");
const feedback_item_1 = require("../models/feedback-item");
const user_1 = require("../models/user");
class SequelizeFeedbackRepository {
    constructor(uuidGenerator, transaction) {
        this.uuidGenerator = uuidGenerator;
        this.transaction = transaction;
    }
    create(data, companyId) {
        return __awaiter(this, void 0, void 0, function* () {
            const feedbackModel = feedback_mapper_1.FeedbackMapper.toPersistence(data);
            feedbackModel.companyId = companyId;
            yield feedback_1.FeedbackModel.create(feedbackModel, {
                transaction: this.transaction,
            });
            if (data.items) {
                const FeedbackItemsModels = data.items.map((item) => {
                    const persistenceData = feedback_item_mapper_1.FeedbackItemMapper.toPersistence(item);
                    const now = new Date();
                    return Object.assign(Object.assign({}, persistenceData), { id: this.uuidGenerator.generate(), feedbackId: feedbackModel.id, createdAt: now, updatedAt: now, deletedAt: null });
                });
                yield feedback_item_1.FeedbackItemModel.bulkCreate(FeedbackItemsModels, {
                    transaction: this.transaction,
                });
            }
            const createdFeedback = yield feedback_1.FeedbackModel.findByPk(feedbackModel.id, {
                transaction: this.transaction,
                include: [{ model: user_1.UserModel, as: "receiver" }],
            });
            if (!createdFeedback) {
                throw new Error("Feedback not found");
            }
            return feedback_mapper_1.FeedbackMapper.toEntity(createdFeedback);
        });
    }
    findAll(_a) {
        return __awaiter(this, arguments, void 0, function* ({ companyId, page, perPage, receiverId, receiverName, }) {
            let where = { companyId: companyId };
            if (receiverId) {
                where.receiverId = receiverId;
            }
            const includeOptions = [{ model: feedback_item_1.FeedbackItemModel, as: "items" }];
            // Se há busca por nome, incluir o modelo de usuário receiver
            if (receiverName) {
                includeOptions.push({
                    model: user_1.UserModel,
                    as: "receiver",
                    where: {
                        name: {
                            [sequelize_1.Op.iLike]: `${receiverName}%`, // Busca nomes que começam com o parâmetro (case insensitive)
                        },
                    },
                    attributes: ["id", "name", "email"], // Apenas os campos necessários
                });
            }
            const models = yield feedback_1.FeedbackModel.findAll({
                where,
                include: includeOptions,
                limit: perPage,
                offset: (page - 1) * perPage,
                order: [["createdAt", "DESC"]],
                transaction: this.transaction,
            });
            return feedback_mapper_1.FeedbackMapper.toEntityList(models);
        });
    }
}
exports.SequelizeFeedbackRepository = SequelizeFeedbackRepository;
//# sourceMappingURL=sequelize-feedback-repository%20.js.map