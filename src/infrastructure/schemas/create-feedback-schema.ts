import z from "zod";

export const createFeedbackItemSchema = z.object({
  label: z.string().trim().min(1).max(50),
  description: z.string().trim().min(1).max(50).nullable(),
  observation: z.string().trim().min(1).max(50).nullable(),
  score: z.number().min(1).max(10),
  weight: z.number().min(1).max(5),
  order: z.number(),
});

export const createFeedbackSchema = z.object({
  title: z.string().trim().min(1).max(50),
  receiverId: z.string().uuid(),
  description: z.string().trim().min(1).max(50).nullable(),
  observation: z.string().trim().min(1).max(50).nullable(),
  score: z.number().min(1).max(100),
  items: z.array(createFeedbackItemSchema),
});
