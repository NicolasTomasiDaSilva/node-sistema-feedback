import { ZodSchema } from "zod";
import { IValidator } from "../../presentation/protocols/validate";
import { BadRequestError } from "../../domain/errors/errors";

export class ZodValidator<T> implements IValidator<T> {
  constructor(private readonly schema: ZodSchema<T>) {}

  validate(data: unknown): T {
    const result = this.schema.safeParse(data);
    if (!result.success) {
      throw new BadRequestError(undefined, result.error.flatten());
    }
    return result.data;
  }
}
