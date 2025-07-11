import { ITokenService } from "../../application/protocols/services/token-service";
import { UnauthorizedError } from "../../domain/errors/errors";
import { IController } from "../protocols/controller";
import { HttpResponse } from "../types/htpp-response";
import { HttpRequest } from "../types/http-request";

export class ControllerAuthDecorator implements IController {
  constructor(
    private readonly tokenService: ITokenService,
    private readonly controller: IController
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const authHeader = request.headers?.authorization;

    if (!authHeader) {
      throw new UnauthorizedError("No token provided");
    }

    const [, token] = authHeader.split(" ");
    if (!token) {
      throw new UnauthorizedError("Token malformed");
    }

    let payload;
    try {
      payload = await this.tokenService.verifyToken(token);
    } catch {
      throw new UnauthorizedError("Invalid or expired token");
    }

    request.user = payload;

    return this.controller.handle(request);
  }
}
