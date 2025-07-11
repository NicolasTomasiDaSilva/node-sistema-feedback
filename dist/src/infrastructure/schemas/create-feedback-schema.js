"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFeedbackSchema = exports.createFeedbackItemSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createFeedbackItemSchema = zod_1.default.object({
    label: zod_1.default.string().trim().min(1).max(50),
    description: zod_1.default.string().trim().min(1).max(50).nullable(),
    observation: zod_1.default.string().trim().min(1).max(50).nullable(),
    score: zod_1.default.number().min(1).max(10),
    weight: zod_1.default.number().min(1).max(5),
    order: zod_1.default.number(),
});
exports.createFeedbackSchema = zod_1.default.object({
    title: zod_1.default.string().trim().min(1).max(50),
    receiverId: zod_1.default.string().uuid(),
    description: zod_1.default.string().trim().min(1).max(50).nullable(),
    observation: zod_1.default.string().trim().min(1).max(50).nullable(),
    score: zod_1.default.number().min(1).max(100),
    items: zod_1.default.array(exports.createFeedbackItemSchema),
});
//# sourceMappingURL=create-feedback-schema.js.map