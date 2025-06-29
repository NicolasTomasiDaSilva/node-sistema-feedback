import { ZodError, ZodSchema } from "zod";
import { IValidator } from "../../presentation/protocols/validate";
import { BadRequestError } from "../../domain/errors/errors";

type FieldErrors = Record<string, string[]>;

export class ZodValidator<T> implements IValidator<T> {
  constructor(private readonly schema: ZodSchema<T>) {}

  validate(data: unknown): T {
    const result = this.schema.safeParse(data);
    if (!result.success) {
      throw new BadRequestError(
        undefined, // você deixa a msg default
        this.formatErrors(result.error) // detalhe já transformado
      );
    }
    return result.data;
  }

  /** Converte issues -> { formErrors, fieldErrors } */
  private formatErrors(error: ZodError): {
    formErrors: string[];
    fieldErrors: FieldErrors;
  } {
    const formErrors: string[] = [];
    const fieldErrors: FieldErrors = {};

    for (const issue of error.issues) {
      if (issue.path.length === 0) {
        // Erros "raiz" (schema-level)
        formErrors.push(issue.message);
      } else {
        // Ex.: ['items', 0, 'label'] -> 'items.0.label'
        const key = issue.path.join(".");
        (fieldErrors[key] ||= []).push(issue.message);
      }
    }

    return { formErrors, fieldErrors };
  }
}
