import { Request, Response } from "express";
import { IController } from "../../presentation/protocols/controller";
import { HttpResponse } from "../../presentation/types/htpp-response";
import { HttpRequest } from "../../presentation/types/http-request";

export function expressRouteAdapter(controllerFactory: () => IController) {
  return async (request: Request, response: Response) => {
    const controller = controllerFactory();

    const { body, query, params } = request;
    const headers: { [key: string]: string } = {};
    Object.entries(request.headers).forEach(([key, value]) => {
      if (typeof value === "string") {
        headers[key] = value;
      } else if (Array.isArray(value) && value.length > 0) {
        headers[key] = value[0];
      }
    });
    const req: HttpRequest = {
      body: body,
      headers: headers,
      query: query,
      params: params,
    };
    const res: HttpResponse = await controller.handle(req);

    response.status(res.status).json(res.body);
  };
}
