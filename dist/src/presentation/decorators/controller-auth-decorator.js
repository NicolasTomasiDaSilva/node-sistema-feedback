"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerAuthDecorator = void 0;
const errors_1 = require("../../domain/errors/errors");
class ControllerAuthDecorator {
    constructor(tokenService, controller) {
        this.tokenService = tokenService;
        this.controller = controller;
    }
    handle(request) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const authHeader = (_a = request.headers) === null || _a === void 0 ? void 0 : _a.authorization;
            if (!authHeader) {
                throw new errors_1.UnauthorizedError("No token provided");
            }
            const [, token] = authHeader.split(" ");
            if (!token) {
                throw new errors_1.UnauthorizedError("Token malformed");
            }
            let payload;
            try {
                payload = yield this.tokenService.verifyToken(token);
            }
            catch (_b) {
                throw new errors_1.UnauthorizedError("Invalid or expired token");
            }
            request.user = payload;
            return this.controller.handle(request);
        });
    }
}
exports.ControllerAuthDecorator = ControllerAuthDecorator;
//# sourceMappingURL=controller-auth-decorator.js.map