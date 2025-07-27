import z from "zod";

export const getFeedbacksSchema = z.object({
  page: z.coerce.number().int().min(1).optional(),
  perPage: z.coerce.number().int().min(1).max(50).optional(),
  receiverName: z.string().min(3).max(50).optional(),
  minScore: z.coerce.number().int().min(1).max(100).optional(),
  maxScore: z.coerce.number().int().min(1).max(100).optional(),
  minDate: z.coerce.date().optional(),
  maxDate: z.coerce.date().optional(),
});
