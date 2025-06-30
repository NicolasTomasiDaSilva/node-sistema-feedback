import { Router } from "express";
import { expressRouteAdapter } from "../../infrastructure/adapters/express-route-adapter";
import { makeCreateFeedbackController } from "../../main/factories/controllers/make-create-feedback-controller copy";
import { makeGetFeedbacksController } from "../../main/factories/controllers/make-get-feedbacks-controller";

const feedbackRoutes = Router();

feedbackRoutes.post("/", expressRouteAdapter(makeCreateFeedbackController()));
feedbackRoutes.get("/", expressRouteAdapter(makeGetFeedbacksController()));

export { feedbackRoutes };
