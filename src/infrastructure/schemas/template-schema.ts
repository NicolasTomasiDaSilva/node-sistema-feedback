import z from "zod";
import { entitySchema } from "./entity-schema";
import { templateItemSchema } from "./template-item-schema";
import { userSchema } from "./user-schema";

export const templateSchema = entitySchema.extend({
  title: z.string().trim().min(3).max(50),
  description: z.string().trim().min(3).max(50).nullable(),
  creator: userSchema,
  items: z.array(templateItemSchema),
});
