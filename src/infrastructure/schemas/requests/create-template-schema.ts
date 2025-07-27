import { templateSchema } from "../template-schema";

export const createTemplateSchema = templateSchema.pick({
  title: true,
  description: true,
  items: true,
});
