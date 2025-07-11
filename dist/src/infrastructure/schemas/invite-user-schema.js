"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inviteUserSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const role_enum_1 = require("../../domain/enums/role-enum");
exports.inviteUserSchema = zod_1.default.object({
    name: zod_1.default
        .string()
        .trim()
        .min(3)
        .max(50)
        .regex(/^[a-zA-ZÀ-ÿ\s]+$/),
    phone: zod_1.default.string().trim().min(10).max(11).nullable(),
    cpf: zod_1.default.string().trim().min(11).max(11),
    role: zod_1.default.enum([role_enum_1.RoleEnum.employee, role_enum_1.RoleEnum.supervisor]),
});
//# sourceMappingURL=invite-user-schema.js.map