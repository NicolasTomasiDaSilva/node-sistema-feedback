import { z } from "zod";

export const getFeedbackSchema = z.object({
  id: z.string().uuid(),
});
