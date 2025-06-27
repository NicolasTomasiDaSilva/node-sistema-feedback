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
exports.LoginController = exports.loginSchema = void 0;
const http_responses_1 = require("../helpers/http-responses");
const zod_1 = require("zod");
const errors_1 = require("../../domain/errors/errors");
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().trim().email(),
    code: zod_1.z.string().trim().min(4).max(4),
});
class LoginController {
    constructor(loginUseCase) {
        this.loginUseCase = loginUseCase;
    }
    handle(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = exports.loginSchema.safeParse(request.body);
            if (!result.success) {
                throw new errors_1.BadRequestError(undefined, result.error.flatten());
            }
            const dto = {
                email: result.data.email,
                code: result.data.code,
            };
            return (0, http_responses_1.ok)(yield this.loginUseCase.execute(dto));
        });
    }
}
exports.LoginController = LoginController;
