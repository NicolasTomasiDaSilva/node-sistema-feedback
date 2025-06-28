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
exports.InviteUserController = void 0;
const http_responses_1 = require("../helpers/http-responses");
const errors_1 = require("../../domain/errors/errors");
class InviteUserController {
    constructor(inviteUserUseCase, bodyValidator) {
        this.inviteUserUseCase = inviteUserUseCase;
        this.bodyValidator = bodyValidator;
    }
    handle(request) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const id = (_a = request.user) === null || _a === void 0 ? void 0 : _a.id;
            const companyId = (_b = request.user) === null || _b === void 0 ? void 0 : _b.companyId;
            if (!id) {
                throw new errors_1.NotFoundError("User not found");
            }
            if (!companyId) {
                throw new errors_1.NotFoundError("Company not found");
            }
            const { name, role } = this.bodyValidator.validate(request.body);
            const dto = {
                userId: id,
                companyId: companyId,
                name: name,
                role: role,
            };
            return (0, http_responses_1.ok)(yield this.inviteUserUseCase.execute(dto));
        });
    }
}
exports.InviteUserController = InviteUserController;
