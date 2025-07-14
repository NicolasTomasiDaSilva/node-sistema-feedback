import z from "zod";

export const templateItemSchema = z.object({
  label: z.string().trim().min(3).max(50),
  description: z.string().trim().min(3).max(50).nullable(),
  weight: z.number().min(1).max(5),
  order: z.number(),
});
