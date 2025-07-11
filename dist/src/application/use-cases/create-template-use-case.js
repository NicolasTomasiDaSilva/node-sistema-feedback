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
exports.CreateTemplateUseCase = void 0;
const template_1 = require("../../domain/entities/template");
const template_item_1 = require("../../domain/entities/template-item");
const role_enum_1 = require("../../domain/enums/role-enum");
const errors_1 = require("../../domain/errors/errors");
class CreateTemplateUseCase {
    constructor(unitOfWork, uuidGenerator) {
        this.unitOfWork = unitOfWork;
        this.uuidGenerator = uuidGenerator;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const requiredRoles = [role_enum_1.RoleEnum.manager, role_enum_1.RoleEnum.supervisor];
            if (!requiredRoles.includes(data.currentUser.role)) {
                throw new errors_1.ForbiddenError("Only managers and supervisors can create Template");
            }
            const templateId = this.uuidGenerator.generate();
            const template = template_1.Template.create({
                id: templateId,
                title: data.title,
                items: data.items.map((item) => {
                    return template_item_1.TemplateItem.create({
                        label: item.label,
                        description: item.description,
                        weight: item.weight,
                        order: item.order,
                    });
                }),
            });
            try {
                yield this.unitOfWork.start();
                const createdTemplate = yield this.unitOfWork
                    .getTemplateRepository()
                    .create(template, data.currentUser.companyId);
                yield this.unitOfWork.commit();
                return createdTemplate;
            }
            catch (error) {
                yield this.unitOfWork.rollback();
                throw error;
            }
        });
    }
}
exports.CreateTemplateUseCase = CreateTemplateUseCase;
//# sourceMappingURL=create-template-use-case.js.map