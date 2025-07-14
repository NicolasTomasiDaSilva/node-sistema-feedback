import z from "zod";
import { templateItemSchema } from "./template-schema";

export const feedbackItemSchema = templateItemSchema.extend({
  score: z.number().min(1).max(10),
  observation: z.string().trim().min(3).max(50).nullable(),
});
