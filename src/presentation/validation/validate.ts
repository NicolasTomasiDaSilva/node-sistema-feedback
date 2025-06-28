import { ZodSchema, ZodError } from "zod";
import { BadRequestError } from "../../domain/errors/errors";

export function validate<T>(schema: ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new BadRequestError(undefined, result.error.flatten());
  }
  return result.data;
}
