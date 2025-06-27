"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverError = exports.forbidden = exports.unauthorized = exports.badRequest = exports.noContent = exports.notFound = exports.created = exports.ok = void 0;
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
const notFound = (error) => ({
    status: 404,
    body: {
        error: error === null || error === void 0 ? void 0 : error.name,
        message: error === null || error === void 0 ? void 0 : error.message,
    },
});
exports.notFound = notFound;
const noContent = () => ({
    status: 204,
    body: null,
});
exports.noContent = noContent;
const badRequest = (error) => {
    var _a;
    return ({
        status: 400,
        body: {
            error: error === null || error === void 0 ? void 0 : error.name,
            message: error === null || error === void 0 ? void 0 : error.message,
            details: (_a = error === null || error === void 0 ? void 0 : error.details) !== null && _a !== void 0 ? _a : undefined,
        },
    });
};
exports.badRequest = badRequest;
const unauthorized = (error) => ({
    status: 401,
    body: {
        error: error === null || error === void 0 ? void 0 : error.name,
        message: error === null || error === void 0 ? void 0 : error.message,
    },
});
exports.unauthorized = unauthorized;
const forbidden = (error) => ({
    status: 403,
    body: {
        error: error === null || error === void 0 ? void 0 : error.name,
        message: error === null || error === void 0 ? void 0 : error.message,
    },
});
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
