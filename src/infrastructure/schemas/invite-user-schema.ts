import z from "zod";
import { RoleEnum } from "../../domain/enums/role-enum";

export const inviteUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3)
    .max(50)
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/),
  phone: z.string().trim().min(10).max(11).nullable(),
  role: z.enum([RoleEnum.employee, RoleEnum.supevisor] as const),
});
