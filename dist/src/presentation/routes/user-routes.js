"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const make_invite_user_controller_1 = require("../../main/factories/controllers/make-invite-user-controller");
const make_get_users_controller_1 = require("../../main/factories/controllers/make-get-users-controller");
const make_login_controller_1 = require("../../main/factories/controllers/make-login-controller");
const express_route_adapter_1 = require("../../infrastructure/adapters/express-route-adapter");
const userRoutes = (0, express_1.Router)();
exports.userRoutes = userRoutes;
userRoutes.post("/login", (0, express_route_adapter_1.expressRouteAdapter)((0, make_login_controller_1.makeLoginController)()));
userRoutes.post("/invite", (0, express_route_adapter_1.expressRouteAdapter)((0, make_invite_user_controller_1.makeInviteUserController)()));
userRoutes.get("/", (0, express_route_adapter_1.expressRouteAdapter)((0, make_get_users_controller_1.makeGetUsersController)()));
//# sourceMappingURL=user-routes.js.map