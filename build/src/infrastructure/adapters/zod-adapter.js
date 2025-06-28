"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodValidator = void 0;
const errors_1 = require("../../domain/errors/errors");
class ZodValidator {
    constructor(schema) {
        this.schema = schema;
    }
    validate(data) {
        const result = this.schema.safeParse(data);
        if (!result.success) {
            throw new errors_1.BadRequestError(undefined, result.error.flatten());
        }
        return result.data;
    }
}
exports.ZodValidator = ZodValidator;
