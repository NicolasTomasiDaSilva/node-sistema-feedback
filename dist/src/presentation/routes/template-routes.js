"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateRoutes = void 0;
const express_1 = require("express");
const express_route_adapter_1 = require("../../infrastructure/adapters/express-route-adapter");
const make_create_template_controller_1 = require("../../main/factories/controllers/make-create-template-controller");
const make_get_templates_controller_1 = require("../../main/factories/controllers/make-get-templates-controller");
const make_update_template_controller_1 = require("../../main/factories/controllers/make-update-template-controller");
const templateRoutes = (0, express_1.Router)();
exports.templateRoutes = templateRoutes;
templateRoutes.get("/", (0, express_route_adapter_1.expressRouteAdapter)((0, make_get_templates_controller_1.makeGetTemplatesController)()));
templateRoutes.post("/", (0, express_route_adapter_1.expressRouteAdapter)((0, make_create_template_controller_1.makeCreateTemplateController)()));
templateRoutes.put("/", (0, express_route_adapter_1.expressRouteAdapter)((0, make_update_template_controller_1.makeUpdateTemplateController)()));
//# sourceMappingURL=template-routes.js.map