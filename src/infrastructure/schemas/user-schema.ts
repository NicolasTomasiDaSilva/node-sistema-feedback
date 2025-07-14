import z from "zod";
import { RoleEnum } from "../../domain/enums/role-enum";
import { entitySchema } from "./entity-schema";

export const userSchema = entitySchema.extend({
  name: z
    .string()
    .trim()
    .min(3)
    .max(50)
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/),
  phone: z.string().trim().min(10).max(11).nullable(),
  cpf: z.string().trim().min(11).max(11),
  role: z.enum([
    RoleEnum.manager,
    RoleEnum.supervisor,
    RoleEnum.employee,
  ] as const),
});
