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
const get_current_user_1 = require("../guardars/get-current-user");
class InviteUserController {
    constructor(inviteUserUseCase, bodyValidator) {
        this.inviteUserUseCase = inviteUserUseCase;
        this.bodyValidator = bodyValidator;
    }
    handle(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = (0, get_current_user_1.getCurrentUser)(request);
            const { name, phone, role } = this.bodyValidator.validate(request.body);
            const dto = {
                currentUser: currentUser,
                name: name,
                phone: phone,
                role: role,
            };
            return (0, http_responses_1.created)((yield this.inviteUserUseCase.execute(dto)).toJSON());
        });
    }
}
exports.InviteUserController = InviteUserController;
