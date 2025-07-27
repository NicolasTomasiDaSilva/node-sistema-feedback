import z from "zod";
import { feedbackSchema } from "../feedback-schema";

export const createFeedbackSchema = feedbackSchema
  .pick({
    title: true,
    description: true,
    observation: true,
    score: true,
    items: true,
  })
  .extend({
    receiverId: z.string().uuid(),
  });
