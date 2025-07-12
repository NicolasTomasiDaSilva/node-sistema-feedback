import { z } from "zod";

export const getTemplateSchema = z.object({
  id: z.string().uuid("Invalid template ID"),
});

export type GetTemplateSchema = z.infer<typeof getTemplateSchema>;
