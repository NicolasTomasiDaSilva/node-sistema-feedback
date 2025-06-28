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
    role: zod_1.default.nativeEnum(role_enum_1.RoleEnum),
});
