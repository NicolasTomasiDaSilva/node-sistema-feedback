"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTemplateSchema = exports.createTemplateItemSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createTemplateItemSchema = zod_1.default.object({
    label: zod_1.default.string().trim().min(1).max(50),
    description: zod_1.default.string().trim().min(1).max(50).nullable(),
    weight: zod_1.default.number().min(1).max(5),
    order: zod_1.default.number(),
});
exports.createTemplateSchema = zod_1.default.object({
    title: zod_1.default.string().trim().min(1).max(50),
    items: zod_1.default.array(exports.createTemplateItemSchema),
});
//# sourceMappingURL=create-template-schema.js.map