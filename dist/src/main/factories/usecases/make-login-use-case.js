"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLoginUseCase = makeLoginUseCase;
const login_use_case_1 = require("../../../application/use-cases/login-use-case");
const jwt_token_service_adapter_1 = require("../../../infrastructure/adapters/jwt-token-service-adapter");
const make_unit_of_work_1 = require("../repositories/make-unit-of-work");
function makeLoginUseCase() {
    const tokenService = new jwt_token_service_adapter_1.JwtTokenServiceAdapter();
    const unitOfWork = (0, make_unit_of_work_1.makeUnitOfWork)();
    return new login_use_case_1.LoginUseCase(unitOfWork, tokenService);
}
//# sourceMappingURL=make-login-use-case.js.map