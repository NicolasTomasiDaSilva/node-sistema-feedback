import { templateSchema } from "../template-schema";

export const updateTemplateSchema = templateSchema.pick({
  id: true,
  title: true,
  description: true,
  items: true,
});
