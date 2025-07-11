"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedbackRoutes = void 0;
const express_1 = require("express");
const express_route_adapter_1 = require("../../infrastructure/adapters/express-route-adapter");
const make_get_feedbacks_controller_1 = require("../../main/factories/controllers/make-get-feedbacks-controller");
const make_create_feedback_controller_copy_1 = require("../../main/factories/controllers/make-create-feedback-controller copy");
const feedbackRoutes = (0, express_1.Router)();
exports.feedbackRoutes = feedbackRoutes;
feedbackRoutes.post("/", (0, express_route_adapter_1.expressRouteAdapter)((0, make_create_feedback_controller_copy_1.makeCreateFeedbackController)()));
feedbackRoutes.get("/", (0, express_route_adapter_1.expressRouteAdapter)((0, make_get_feedbacks_controller_1.makeGetFeedbacksController)()));
//# sourceMappingURL=feedback-routes.js.map