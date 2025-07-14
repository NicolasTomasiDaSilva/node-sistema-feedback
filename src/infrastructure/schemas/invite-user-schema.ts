import z from "zod";
import { RoleEnum } from "../../domain/enums/role-enum";
import { userSchema } from "./user-schema";

export const inviteUserSchema = userSchema
  .pick({
    name: true,
    phone: true,
    cpf: true,
  })
  .extend({
    role: z.enum([RoleEnum.employee, RoleEnum.supervisor] as const),
  });
