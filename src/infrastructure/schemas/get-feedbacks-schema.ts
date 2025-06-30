import z from "zod";

export const getFeedbacksSchema = z.object({
  page: z.coerce.number().int().min(1).optional(),
  perPage: z.coerce.number().int().min(1).max(50).optional(),
});
