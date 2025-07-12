import { Router } from "express";
import { expressRouteAdapter } from "../../infrastructure/adapters/express-route-adapter";
import { makeCreateTemplateController } from "../../main/factories/controllers/make-create-template-controller";
import { makeGetTemplateController } from "../../main/factories/controllers/make-get-template-controller";
import { makeGetTemplatesController } from "../../main/factories/controllers/make-get-templates-controller";
import { makeUpdateTemplateController } from "../../main/factories/controllers/make-update-template-controller";

const templateRoutes = Router();

templateRoutes.get(
  "/",
  expressRouteAdapter(() => makeGetTemplatesController())
);

templateRoutes.get(
  "/:id",
  expressRouteAdapter(() => makeGetTemplateController())
);

templateRoutes.post(
  "/",
  expressRouteAdapter(() => makeCreateTemplateController())
);

templateRoutes.put(
  "/",
  expressRouteAdapter(() => makeUpdateTemplateController())
);

export { templateRoutes };
