import { Router } from "express";
import { makeInviteUserController } from "../../main/factories/controllers/make-invite-user-controller";

import { makeLoginController } from "../../main/factories/controllers/make-login-controller";
import { expressRouteAdapter } from "../../infrastructure/adapters/express-route-adapter";

const userRoutes = Router();

userRoutes.post("/login", expressRouteAdapter(makeLoginController()));
userRoutes.post("/invite", expressRouteAdapter(makeInviteUserController()));

export { userRoutes };
