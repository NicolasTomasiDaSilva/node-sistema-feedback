import { ok } from "../helpers/http-responses";
import { IController } from "../protocols/controller";
import { HttpRequest } from "../types/http-request";
import { HttpResponse } from "../types/htpp-response";
import { z } from "zod";

import { LoginDTO } from "../../application/dtos/login-dto";
import { ILoginUseCase } from "../../application/protocols/use-cases/login-use-case";
import { BadRequestError } from "../../domain/errors/errors";
import { IValidator } from "../protocols/validate";

export const loginSchema = z.object({
  email: z.string().trim().email(),
  code: z.string().trim().min(4).max(4),
});

export class LoginController implements IController {
  constructor(
    private readonly loginUseCase: ILoginUseCase,
    private readonly bodyValidator: IValidator<LoginDTO>
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { email, code } = this.bodyValidator.validate(request.body);
    const dto: LoginDTO = {
      email,
      code,
    };
    return ok(await this.loginUseCase.execute(dto));
  }
}
