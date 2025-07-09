import z from "zod";

export const updateTemplateFeedbackItemSchema = z.object({
  label: z.string().trim().min(1).max(50),
  description: z.string().trim().min(1).max(50).nullable(),
  weight: z.number().min(1).max(5),
  order: z.number(),
});

export const updateTemplateFeedbackSchema = z.object({
  id: z.string().uuid(),
  title: z.string().trim().min(1).max(50),
  items: z.array(updateTemplateFeedbackItemSchema),
});
