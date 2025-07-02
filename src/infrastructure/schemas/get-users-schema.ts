import z from "zod";

export const getUsersSchema = z.object({
  page: z.coerce.number().int().min(1).optional(),
  perPage: z.coerce.number().int().min(1).max(50).optional(),
  name: z.string().min(3).max(50).optional(),
});
