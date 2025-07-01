import { Router } from "express";
import { expressRouteAdapter } from "../../infrastructure/adapters/express-route-adapter";
import { makeGetFeedbacksController } from "../../main/factories/controllers/make-get-feedbacks-controller";
import { makeCreateTemplateFeedbackController } from "../../main/factories/controllers/make-create-template-feedback-controller";
import { makeCreateFeedbackController } from "../../main/factories/controllers/make-create-feedback-controller copy";

const feedbackRoutes = Router();

feedbackRoutes.post("/", expressRouteAdapter(makeCreateFeedbackController()));
feedbackRoutes.get("/", expressRouteAdapter(makeGetFeedbacksController()));

export { feedbackRoutes };
