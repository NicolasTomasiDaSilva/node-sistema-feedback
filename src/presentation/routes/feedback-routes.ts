import { Router } from "express";
import { expressRouteAdapter } from "../../infrastructure/adapters/express-route-adapter";
import { makeCreateFeedbackController } from "../../main/factories/controllers/make-create-feedback-controller copy";

const feedbackRoutes = Router();

feedbackRoutes.post("/", expressRouteAdapter(makeCreateFeedbackController()));

export { feedbackRoutes };
