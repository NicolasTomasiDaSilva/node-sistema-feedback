"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtTokenServiceAdapter = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const errors_1 = require("../../domain/errors/errors");
class JwtTokenServiceAdapter {
    constructor() {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT secrets not found.");
        }
        this.secret = process.env.JWT_SECRET;
        const accessExpiresSec = Number(process.env.JWT_ACCESS_EXPIRES_SEC) || 900;
        const refreshExpiresSec = Number(process.env.JWT_REFRESH_EXPIRES_SEC) || 7 * 24 * 3600;
        this.accessOptions = {
            expiresIn: accessExpiresSec,
            issuer: process.env.JWT_ISSUER,
        };
        this.refreshOptions = {
            expiresIn: refreshExpiresSec,
            issuer: process.env.JWT_ISSUER,
        };
    }
    generateTokens(user) {
        const payload = {
            id: user.id,
            companyId: user.companyId,
            role: user.role,
        };
        const accessToken = (0, jsonwebtoken_1.sign)(payload, this.secret, this.accessOptions);
        const refreshToken = (0, jsonwebtoken_1.sign)(payload, this.secret, this.refreshOptions);
        return { accessToken, refreshToken };
    }
    verifyToken(token) {
        try {
            return (0, jsonwebtoken_1.verify)(token, this.secret);
        }
        catch (error) {
            throw new errors_1.UnauthorizedError("Invalid or expired token");
        }
    }
}
exports.JwtTokenServiceAdapter = JwtTokenServiceAdapter;
//# sourceMappingURL=jwt-token-service-adapter.js.map