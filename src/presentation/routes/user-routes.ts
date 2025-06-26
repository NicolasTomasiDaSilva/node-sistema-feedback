import { Router } from "express";
import { makeInviteUserController } from "../../main/factories/controllers/make-invite-user-controller";
import { expressRouteAdapter } from "../../main/adapters/express-route-adapter";
import { makeLoginController } from "../../main/factories/controllers/make-login-controller";

const userRoutes = Router();

userRoutes.post("/login", expressRouteAdapter(makeLoginController()));
userRoutes.post("/invite", expressRouteAdapter(makeInviteUserController()));

export { userRoutes };
