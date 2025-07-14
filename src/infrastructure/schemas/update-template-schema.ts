import { templateSchema } from "./template-schema";

export const updateTemplateSchema = templateSchema.pick({
  title: true,
  description: true,
  items: true,
});
