"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverError = exports.forbidden = exports.unauthorized = exports.badRequest = exports.noContent = exports.created = exports.ok = void 0;
const ok = (data) => ({
    status: 200,
    body: data,
});
exports.ok = ok;
const created = (data) => ({
    status: 201,
    body: data,
});
exports.created = created;
const noContent = () => ({
    status: 204,
    body: null,
});
exports.noContent = noContent;
const badRequest = (error) => {
    var _a, _b;
    return ({
        status: 400,
        body: {
            error: "Bad Request",
            message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : error,
            details: (_b = error === null || error === void 0 ? void 0 : error.details) !== null && _b !== void 0 ? _b : undefined,
        },
    });
};
exports.badRequest = badRequest;
const unauthorized = (error = "Unauthorized") => {
    var _a;
    return ({
        status: 401,
        body: {
            error: "Unauthorized",
            message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : error,
        },
    });
};
exports.unauthorized = unauthorized;
const forbidden = (error) => {
    var _a;
    return ({
        status: 403,
        body: {
            error: "Forbidden",
            message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : error,
        },
    });
};
exports.forbidden = forbidden;
const serverError = (error) => {
    var _a;
    return ({
        status: 500,
        body: {
            error: "Internal Server Error",
            message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "Something went wrong",
        },
    });
};
exports.serverError = serverError;
