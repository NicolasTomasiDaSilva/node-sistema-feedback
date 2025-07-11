"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceUnavailableError = exports.InternalServerError = exports.ConflictError = exports.BadRequestError = exports.ForbiddenError = exports.UnauthorizedError = exports.NotFoundError = void 0;
class NotFoundError extends Error {
    constructor(message = "Not Found") {
        super(message);
        this.name = this.constructor.name;
    }
}
exports.NotFoundError = NotFoundError;
class UnauthorizedError extends Error {
    constructor(message = "Unauthorized") {
        super(message);
        this.name = this.constructor.name;
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ForbiddenError extends Error {
    constructor(message = "Forbidden") {
        super(message);
        this.name = this.constructor.name;
    }
}
exports.ForbiddenError = ForbiddenError;
class BadRequestError extends Error {
    constructor(message = "Bad Request", details) {
        super(message);
        this.name = this.constructor.name;
        this.details = details !== null && details !== void 0 ? details : undefined;
    }
}
exports.BadRequestError = BadRequestError;
class ConflictError extends Error {
    constructor(message = "Conflict") {
        super(message);
        this.name = this.constructor.name;
    }
}
exports.ConflictError = ConflictError;
class InternalServerError extends Error {
    constructor(message = "Internal Server Error") {
        super(message);
        this.name = this.constructor.name;
    }
}
exports.InternalServerError = InternalServerError;
class ServiceUnavailableError extends Error {
    constructor(message = "Service Unavailable") {
        super(message);
        this.name = this.constructor.name;
    }
}
exports.ServiceUnavailableError = ServiceUnavailableError;
//# sourceMappingURL=errors.js.map