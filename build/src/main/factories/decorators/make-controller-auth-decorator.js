"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeControllerAuthDecorator = makeControllerAuthDecorator;
const jwt_token_service_adapter_1 = require("../../../infrastructure/adapters/jwt-token-service-adapter");
const controller_auth_decorator_1 = require("../../../presentation/decorators/controller-auth-decorator");
function makeControllerAuthDecorator(controller, roles) {
    return new controller_auth_decorator_1.ControllerAuthDecorator(new jwt_token_service_adapter_1.JwtTokenServiceAdapter(), controller, roles);
}
