"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLoginUseCase = makeLoginUseCase;
const login_use_case_1 = require("../../../application/use-cases/login-use-case");
const jwt_token_service_adapter_1 = require("../../../infrastructure/adapters/jwt-token-service-adapter");
const make_user_repository_1 = require("../repositories/make-user-repository");
function makeLoginUseCase() {
    const tokenService = new jwt_token_service_adapter_1.JwtTokenServiceAdapter();
    return new login_use_case_1.LoginUseCase((0, make_user_repository_1.makeUserRepository)(), tokenService);
}
