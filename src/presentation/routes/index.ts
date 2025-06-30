import { Router } from "express";
import { userRoutes } from "./user-routes";
import { templateFeedbackRoutes } from "./template-feedback-routes";
import { feedbackRoutes } from "./feedback-routes";

const router = Router();

router.use("/api/users", userRoutes);
router.use("/api/feedbacks", feedbackRoutes);
router.use("/api/feedbacks/templates", templateFeedbackRoutes);

export { router };
