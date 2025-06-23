"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const make_invite_user_controller_1 = require("../../main/factories/controllers/make-invite-user-controller");
const express_route_adapter_1 = require("../../main/adapters/express-route-adapter");
const userRoutes = (0, express_1.Router)();
exports.userRoutes = userRoutes;
userRoutes.post("/invite", (0, express_route_adapter_1.expressRouteAdapter)((0, make_invite_user_controller_1.makeInviteUserController)()));
