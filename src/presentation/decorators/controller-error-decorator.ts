import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from "../../domain/errors/errors";
import {
  badRequest,
  forbidden,
  notFound,
  serverError,
  unauthorized,
} from "../helpers/http-responses";
import { IController } from "../protocols/controller";
import { HttpResponse } from "../types/htpp-response";
import { HttpRequest } from "../types/http-request";

export class ControllerErrorDecorator implements IController {
  constructor(private readonly controller: IController) {}
  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      return await this.controller.handle(request);
    } catch (error) {
      console.error(error);
      if (error instanceof BadRequestError) {
        return badRequest(error);
      } else if (error instanceof NotFoundError) {
        return notFound(error);
      } else if (error instanceof UnauthorizedError) {
        return unauthorized(error);
      } else if (error instanceof ForbiddenError) {
        return forbidden(error);
      } else {
        return serverError(error);
      }
    }
  }
}
