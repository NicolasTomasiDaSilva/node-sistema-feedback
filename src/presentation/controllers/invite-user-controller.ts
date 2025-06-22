import { ok, serverError } from "../helpers/http-responses";
import { Controller } from "../protocols/controller";
import { HttpRequest } from "../types/http-request";
import { HttpResponse } from "../types/htpp-response";

export class InviteUserController implements Controller {
  constructor() {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      return ok({});
    } catch (error) {
      return serverError(new Error());
    }
  }
}
