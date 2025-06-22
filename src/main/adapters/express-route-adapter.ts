import { HttpRequest } from "../../presentation/types/http-request";
import { HttpResponse } from "../../presentation/types/htpp-response";
import { Request, Response } from "express";
import { Controller } from "../../presentation/protocols/controller";

export function expressRouteAdapter(controller: Controller) {
  return async (request: Request, response: Response) => {
    const { body } = request;
    const req: HttpRequest = {
      body: body,
    };
    const res: HttpResponse = await controller.handle(req);

    response.status(res.status).json(req.body);
  };
}
