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
exports.SequelizeTemplateRepository = void 0;
const template_item_mapper_1 = require("../mappers/template-item-mapper");
const template_mapper_1 = require("../mappers/template-mapper");
const template_1 = require("../models/template");
const template_item_1 = require("../models/template-item");
class SequelizeTemplateRepository {
    constructor(uuidGenerator, transaction) {
        this.uuidGenerator = uuidGenerator;
        this.transaction = transaction;
    }
    create(data, companyId) {
        return __awaiter(this, void 0, void 0, function* () {
            const templateModel = template_mapper_1.TemplateMapper.toPersistence(data);
            templateModel.companyId = companyId;
            yield template_1.TemplateModel.create(templateModel, {
                transaction: this.transaction,
            });
            if (data.items) {
                const templateItemsModels = data.items.map((item) => {
                    const persistenceData = template_item_mapper_1.TemplateItemMapper.toPersistence(item);
                    const now = new Date();
                    return Object.assign(Object.assign({}, persistenceData), { id: this.uuidGenerator.generate(), templateId: templateModel.id, createdAt: now, updatedAt: now, deletedAt: null });
                });
                yield template_item_1.TemplateItemModel.bulkCreate(templateItemsModels, {
                    transaction: this.transaction,
                });
            }
            const createdTemplate = yield template_1.TemplateModel.findByPk(templateModel.id, {
                transaction: this.transaction,
            });
            if (!createdTemplate) {
                throw new Error("Template not found");
            }
            return template_mapper_1.TemplateMapper.toEntity(createdTemplate);
        });
    }
    findById(id, companyId) {
        return __awaiter(this, void 0, void 0, function* () {
            const templateModel = yield template_1.TemplateModel.findOne({
                where: { id, companyId },
                include: [{ model: template_item_1.TemplateItemModel, as: "items" }],
                transaction: this.transaction,
            });
            if (!templateModel) {
                return null;
            }
            return template_mapper_1.TemplateMapper.toEntity(templateModel);
        });
    }
    update(data, companyId) {
        return __awaiter(this, void 0, void 0, function* () {
            const templateModel = template_mapper_1.TemplateMapper.toPersistence(data);
            templateModel.companyId = companyId;
            yield template_1.TemplateModel.update(data, {
                where: { id: data.id, companyId },
                transaction: this.transaction,
            });
            // Deletar todos os itens existentes
            yield template_item_1.TemplateItemModel.destroy({
                where: { templateId: data.id },
                transaction: this.transaction,
            });
            // Criar os novos itens
            if (data.items) {
                const templateItemsModels = data.items.map((item) => {
                    const persistenceData = template_item_mapper_1.TemplateItemMapper.toPersistence(item);
                    const now = new Date();
                    return Object.assign(Object.assign({}, persistenceData), { id: this.uuidGenerator.generate(), templateId: data.id, createdAt: now, updatedAt: now, deletedAt: null });
                });
                yield template_item_1.TemplateItemModel.bulkCreate(templateItemsModels, {
                    transaction: this.transaction,
                });
            }
            const updatedTemplateModel = yield template_1.TemplateModel.findOne({
                where: { id: data.id, companyId },
                include: [{ model: template_item_1.TemplateItemModel, as: "items" }],
                transaction: this.transaction,
            });
            if (!updatedTemplateModel) {
                throw new Error("Template not found after update");
            }
            return template_mapper_1.TemplateMapper.toEntity(updatedTemplateModel);
        });
    }
    findAll(_a) {
        return __awaiter(this, arguments, void 0, function* ({ companyId, page, perPage, }) {
            const offset = (page - 1) * perPage;
            const templateModels = yield template_1.TemplateModel.findAll({
                where: { companyId },
                include: [{ model: template_item_1.TemplateItemModel, as: "items" }],
                limit: perPage,
                offset,
                order: [["createdAt", "DESC"]],
                transaction: this.transaction,
            });
            return template_mapper_1.TemplateMapper.toEntityList(templateModels);
        });
    }
}
exports.SequelizeTemplateRepository = SequelizeTemplateRepository;
//# sourceMappingURL=sequelize-template-repository.js.map