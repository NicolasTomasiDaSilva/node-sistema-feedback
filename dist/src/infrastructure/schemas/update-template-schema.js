"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTemplateSchema = exports.updateTemplateItemSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.updateTemplateItemSchema = zod_1.default.object({
    label: zod_1.default.string().trim().min(1).max(50),
    description: zod_1.default.string().trim().min(1).max(50).nullable(),
    weight: zod_1.default.number().min(1).max(5),
    order: zod_1.default.number(),
});
exports.updateTemplateSchema = zod_1.default.object({
    id: zod_1.default.string().uuid(),
    title: zod_1.default.string().trim().min(1).max(50),
    items: zod_1.default.array(exports.updateTemplateItemSchema),
});
//# sourceMappingURL=update-template-schema.js.map