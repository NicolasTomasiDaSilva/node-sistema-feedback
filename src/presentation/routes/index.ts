import { Router } from "express";
import { userRoutes } from "./user-routes";
import { checklistRoutes } from "./checklist-routes";

const router = Router();

router.use("/api/users", userRoutes);
router.use("/api/checklists", checklistRoutes);

export { router };
