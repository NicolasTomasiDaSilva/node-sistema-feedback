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
exports.InviteUserController = exports.inviteUserSchema = void 0;
const http_responses_1 = require("../helpers/http-responses");
const zod_1 = require("zod");
const role_enum_1 = require("../../domain/enums/role-enum");
const errors_1 = require("../../domain/errors/errors");
exports.inviteUserSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .trim()
        .min(3)
        .max(50)
        .regex(/^[a-zA-ZÀ-ÿ\s]+$/),
    role: zod_1.z.nativeEnum(role_enum_1.RoleEnum),
});
class InviteUserController {
    constructor(inviteUserUseCase) {
        this.inviteUserUseCase = inviteUserUseCase;
    }
    handle(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = exports.inviteUserSchema.safeParse(request.body);
            if (!result.success) {
                throw new errors_1.BadRequestError(undefined, result.error.flatten());
            }
            const dto = {
                name: result.data.name,
                role: result.data.role,
            };
            return (0, http_responses_1.ok)(yield this.inviteUserUseCase.execute(dto));
        });
    }
}
exports.InviteUserController = InviteUserController;
