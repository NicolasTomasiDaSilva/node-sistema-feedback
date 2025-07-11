import { Router } from "express";
import { feedbackRoutes } from "./feedback-routes";
import { templateRoutes } from "./template-routes";
import { userRoutes } from "./user-routes";

const router = Router();

router.use("/api/users", userRoutes);
router.use("/api/feedbacks", feedbackRoutes);
router.use("/api/templates", templateRoutes);

export { router };
