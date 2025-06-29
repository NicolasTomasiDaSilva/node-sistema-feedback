import { Router } from "express";
import { expressRouteAdapter } from "../../infrastructure/adapters/express-route-adapter";
import { makeCreateChecklistController } from "../../main/factories/controllers/make-create-checklist-controller";

const checklistRoutes = Router();

checklistRoutes.post("/", expressRouteAdapter(makeCreateChecklistController()));

export { checklistRoutes };
