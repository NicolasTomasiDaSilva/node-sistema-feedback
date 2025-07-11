"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.getUsersSchema = zod_1.default.object({
    page: zod_1.default.coerce.number().int().min(1).optional(),
    perPage: zod_1.default.coerce.number().int().min(1).max(50).optional(),
    name: zod_1.default.string().min(3).max(50).optional(),
});
//# sourceMappingURL=get-users-schema.js.map