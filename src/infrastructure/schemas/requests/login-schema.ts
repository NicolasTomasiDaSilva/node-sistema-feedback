import z from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email(),
  code: z.string().trim().min(4).max(4),
});
