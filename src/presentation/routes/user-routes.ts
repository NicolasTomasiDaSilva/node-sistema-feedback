import { Router } from "express";
import { makeInviteUserController } from "../../main/factories/controllers/make-invite-user-controller";
import { expressRouteAdapter } from "../../main/adapters/express-route-adapter";

const userRoutes = Router();

userRoutes.post("/invite", expressRouteAdapter(makeInviteUserController()));

export { userRoutes };
