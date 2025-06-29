import { Router } from "express";
import { userRoutes } from "./user-routes";
import { checklistRoutes } from "./checklist-routes";
import { feedbackRoutes } from "./feedback-routes";

const router = Router();

router.use("/api/users", userRoutes);
router.use("/api/checklists", checklistRoutes);
router.use("/api/feedbacks", feedbackRoutes);

export { router };
