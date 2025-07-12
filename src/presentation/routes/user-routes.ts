import { Router } from "express";
import { expressRouteAdapter } from "../../infrastructure/adapters/express-route-adapter";
import { makeGetUsersController } from "../../main/factories/controllers/make-get-users-controller";
import { makeInviteUserController } from "../../main/factories/controllers/make-invite-user-controller";
import { makeLoginController } from "../../main/factories/controllers/make-login-controller";

const userRoutes = Router();

userRoutes.post(
  "/login",
  expressRouteAdapter(() => makeLoginController())
);
userRoutes.post(
  "/invite",
  expressRouteAdapter(() => makeInviteUserController())
);
userRoutes.get(
  "/",
  expressRouteAdapter(() => makeGetUsersController())
);
export { userRoutes };
