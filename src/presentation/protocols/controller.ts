import { HttpRequest } from "../types/http-request";
import { HttpResponse } from "../types/htpp-response";
export interface IController {
  handle: (request: HttpRequest) => Promise<HttpResponse>;
}
