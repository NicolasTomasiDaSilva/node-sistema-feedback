"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = getCurrentUser;
const errors_1 = require("../../domain/errors/errors");
function getCurrentUser(request) {
    const user = request.user;
    if (!user)
        throw new errors_1.UnauthorizedError("Not authenticated");
    if (!user.id)
        throw new errors_1.NotFoundError("User not found");
    if (!user.companyId)
        throw new errors_1.NotFoundError("Company not found");
    return user;
}
