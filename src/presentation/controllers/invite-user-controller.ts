import { badRequest, ok, serverError } from "../helpers/http-responses";
import { IController } from "../protocols/controller";
import { HttpRequest } from "../types/http-request";
import { HttpResponse } from "../types/htpp-response";
import { z } from "zod";
import { RoleEnum } from "../../domain/enums/role-enum";
import { IInviteUserUseCase } from "../../application/protocols/use-cases/invite-user-use-case";
import { InviteUserDTO } from "../../application/dtos/invite-user-dto";
import { BadRequestError, NotFoundError } from "../../domain/errors/errors";

export const inviteUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3)
    .max(50)
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/),
  role: z.nativeEnum(RoleEnum),
});

export class InviteUserController implements IController {
  constructor(private readonly inviteUserUseCase: IInviteUserUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const id = request.user?.id;
    const companyId = request.user?.companyId;
    if (!id) {
      throw new NotFoundError("User not found");
    }
    if (!companyId) {
      throw new NotFoundError("Company not found");
    }

    const result = inviteUserSchema.safeParse(request.body);
    if (!result.success) {
      throw new BadRequestError(undefined, result.error.flatten());
    }

    const dto: InviteUserDTO = {
      userId: id,
      companyId: companyId,
      name: result.data.name,
      role: result.data.role,
    };
    return ok(await this.inviteUserUseCase.execute(dto));
  }
}
