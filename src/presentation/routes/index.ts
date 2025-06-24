import { Router } from "express";
import { userRoutes } from "./user-routes";

const router = Router();

router.use("/api/users", userRoutes);

export { router };
