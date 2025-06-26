import { badRequest, ok, serverError } from "../helpers/http-responses";
import { IController } from "../protocols/controller";
import { HttpRequest } from "../types/http-request";
import { HttpResponse } from "../types/htpp-response";
import { z } from "zod";
import { RoleEnum } from "../../domain/enums/role-enum";
import { IInviteUserUseCase } from "../../application/protocols/use-cases/invite-user-use-case";
import { InviteUserDTO } from "../../application/dtos/invite-user-dto";
import { LoginDTO } from "../../application/dtos/login-dto";
import { ILoginUseCase } from "../../application/protocols/use-cases/login-use-case";

export const loginSchema = z.object({
  email: z.string().trim().email(),
  code: z.string().trim().min(4).max(4),
});

export class LoginController implements IController {
  constructor(private readonly loginUseCase: ILoginUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const result = loginSchema.safeParse(request.body);
    if (!result.success) {
      return badRequest(result.error.format());
    }
    const dto: LoginDTO = {
      email: result.data.email,
      code: result.data.code,
    };
    return ok(await this.loginUseCase.execute(dto));
  }
}
