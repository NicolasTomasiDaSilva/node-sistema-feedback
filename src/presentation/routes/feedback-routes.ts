import { Router } from "express";
import { expressRouteAdapter } from "../../infrastructure/adapters/express-route-adapter";
import { makeGetFeedbacksController } from "../../main/factories/controllers/make-get-feedbacks-controller";

import { makeCreateFeedbackController } from "../../main/factories/controllers/make-create-feedback-controller copy";
import { makeGetFeedbackController } from "../../main/factories/controllers/make-get-feedback-controller";

const feedbackRoutes = Router();

feedbackRoutes.post(
  "/",
  expressRouteAdapter(() => makeCreateFeedbackController())
);
feedbackRoutes.get(
  "/",
  expressRouteAdapter(() => makeGetFeedbacksController())
);

feedbackRoutes.get(
  "/:id",
  expressRouteAdapter(() => makeGetFeedbackController())
);

export { feedbackRoutes };
