import z from "zod";

export const createTemplateItemSchema = z.object({
  label: z.string().trim().min(1).max(50),
  description: z.string().trim().min(1).max(50).nullable(),
  weight: z.number().min(1).max(5),
  order: z.number(),
});

export const createTemplateSchema = z.object({
  title: z.string().trim().min(1).max(50),
  items: z.array(createTemplateItemSchema),
});
