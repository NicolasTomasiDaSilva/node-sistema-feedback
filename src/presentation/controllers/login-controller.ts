import { ok } from "../helpers/http-responses";
import { IController } from "../protocols/controller";
import { HttpRequest } from "../types/http-request";
import { HttpResponse } from "../types/htpp-response";

import { LoginDTO } from "../../application/dtos/login-dto";
import { ILoginUseCase } from "../../application/protocols/use-cases/login-use-case";
import { BadRequestError } from "../../domain/errors/errors";
import { IValidator } from "../protocols/validate";

export class LoginController implements IController {
  constructor(
    private readonly loginUseCase: ILoginUseCase,
    private readonly bodyValidator: IValidator<LoginDTO>
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const dto = this.bodyValidator.validate(request.body);
    return ok(await this.loginUseCase.execute(dto));
  }
}
