import { Router } from "express";
import { expressRouteAdapter } from "../../infrastructure/adapters/express-route-adapter";
import { makeCreateTemplateFeedbackController } from "../../main/factories/controllers/make-create-template-feedback-controller";
import { makeUpdateTemplateFeedbackController } from "../../main/factories/controllers/make-update-template-feedback-controller";

const templateFeedbackRoutes = Router();

templateFeedbackRoutes.post(
  "/",
  expressRouteAdapter(makeCreateTemplateFeedbackController())
);

templateFeedbackRoutes.put(
  "/",
  expressRouteAdapter(makeUpdateTemplateFeedbackController())
);

export { templateFeedbackRoutes };
