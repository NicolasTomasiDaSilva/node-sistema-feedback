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
exports.GetUsersUseCase = void 0;
const role_enum_1 = require("../../domain/enums/role-enum");
const errors_1 = require("../../domain/errors/errors");
class GetUsersUseCase {
    constructor(unitOfWork) {
        this.unitOfWork = unitOfWork;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { currentUser, page, perPage, name } = data;
            const requiredRoles = [role_enum_1.RoleEnum.manager, role_enum_1.RoleEnum.supervisor];
            if (!requiredRoles.includes(data.currentUser.role)) {
                throw new errors_1.ForbiddenError("Only managers and supervisors can get users");
            }
            return this.unitOfWork.getUserRepository().findAll({
                companyId: currentUser.companyId,
                page: page !== null && page !== void 0 ? page : 1,
                perPage: perPage !== null && perPage !== void 0 ? perPage : 5,
                name,
            });
        });
    }
}
exports.GetUsersUseCase = GetUsersUseCase;
//# sourceMappingURL=get-users-use-case.js.map