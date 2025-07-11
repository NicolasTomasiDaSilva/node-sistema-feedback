"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const feedback_routes_1 = require("./feedback-routes");
const template_routes_1 = require("./template-routes");
const user_routes_1 = require("./user-routes");
const router = (0, express_1.Router)();
exports.router = router;
router.use("/api/users", user_routes_1.userRoutes);
router.use("/api/feedbacks", feedback_routes_1.feedbackRoutes);
router.use("/api/templates", template_routes_1.templateRoutes);
//# sourceMappingURL=index.js.map