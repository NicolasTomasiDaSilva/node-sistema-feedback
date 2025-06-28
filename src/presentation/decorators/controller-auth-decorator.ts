import { IController } from "../protocols/controller";
import { HttpRequest } from "../types/http-request";
import { ITokenService } from "../../application/protocols/services/token-service";
import { ForbiddenError, UnauthorizedError } from "../../domain/errors/errors";
import { HttpResponse } from "../types/htpp-response";
import { RoleEnum } from "../../domain/enums/role-enum";

export class ControllerAuthDecorator implements IController {
  constructor(
    private readonly tokenService: ITokenService,
    private readonly controller: IController,
    private readonly requiredRoles: RoleEnum[]
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

    const userRole = payload.role;

    if (
      this.requiredRoles.length === 0 ||
      this.requiredRoles.includes(userRole)
    ) {
      return this.controller.handle(request);
    }

    throw new ForbiddenError("Insufficient permissions");
  }
}
