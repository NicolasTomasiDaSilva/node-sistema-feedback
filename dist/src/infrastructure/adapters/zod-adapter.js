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
            throw new errors_1.BadRequestError(undefined, // você deixa a msg default
            this.formatErrors(result.error) // detalhe já transformado
            );
        }
        return result.data;
    }
    /** Converte issues -> { formErrors, fieldErrors } */
    formatErrors(error) {
        const formErrors = [];
        const fieldErrors = {};
        for (const issue of error.issues) {
            if (issue.path.length === 0) {
                // Erros "raiz" (schema-level)
                formErrors.push(issue.message);
            }
            else {
                // Ex.: ['items', 0, 'label'] -> 'items.0.label'
                const key = issue.path.join(".");
                (fieldErrors[key] || (fieldErrors[key] = [])).push(issue.message);
            }
        }
        return { formErrors, fieldErrors };
    }
}
exports.ZodValidator = ZodValidator;
//# sourceMappingURL=zod-adapter.js.map