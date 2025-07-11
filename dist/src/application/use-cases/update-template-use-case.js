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
exports.UpdateTemplateUseCase = void 0;
const template_item_1 = require("../../domain/entities/template-item");
const role_enum_1 = require("../../domain/enums/role-enum");
const errors_1 = require("../../domain/errors/errors");
class UpdateTemplateUseCase {
    constructor(unitOfWork) {
        this.unitOfWork = unitOfWork;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const requiredRoles = [role_enum_1.RoleEnum.manager, role_enum_1.RoleEnum.supervisor];
            if (!requiredRoles.includes(data.currentUser.role)) {
                throw new errors_1.ForbiddenError("Only managers and supervisors can update Template");
            }
            if (!data.items.length) {
                throw new errors_1.BadRequestError("Template must have at least one item");
            }
            try {
                yield this.unitOfWork.start();
                const existingTemplate = yield this.unitOfWork
                    .getTemplateRepository()
                    .findById(data.id, data.currentUser.companyId);
                if (!existingTemplate) {
                    throw new errors_1.NotFoundError("Template not found");
                }
                existingTemplate.title = data.title;
                existingTemplate.items = data.items.map((item) => template_item_1.TemplateItem.create({
                    label: item.label,
                    description: item.description,
                    weight: item.weight,
                    order: item.order,
                }));
                const result = yield this.unitOfWork
                    .getTemplateRepository()
                    .update(existingTemplate, data.currentUser.companyId);
                yield this.unitOfWork.commit();
                return result;
            }
            catch (error) {
                yield this.unitOfWork.rollback();
                throw error;
            }
        });
    }
}
exports.UpdateTemplateUseCase = UpdateTemplateUseCase;
//# sourceMappingURL=update-template-use-case.js.map