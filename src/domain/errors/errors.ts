export class NotFoundError extends Error {
  constructor(message: string = "Not Found") {
    super(message);
    this.name = this.constructor.name;
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string = "Unauthorized") {
    super(message);
    this.name = this.constructor.name;
  }
}

export class ForbiddenError extends Error {
  constructor(message: string = "Forbidden") {
    super(message);
    this.name = this.constructor.name;
  }
}

export class BadRequestError extends Error {
  details?: any;
  constructor(message: string = "Bad Request", details?: any) {
    super(message);

    this.name = this.constructor.name;
    this.details = details ?? undefined;
  }
}

export class ConflictError extends Error {
  constructor(message: string = "Conflict") {
    super(message);
    this.name = this.constructor.name;
  }
}

export class InternalServerError extends Error {
  constructor(message: string = "Internal Server Error") {
    super(message);
    this.name = this.constructor.name;
  }
}

export class ServiceUnavailableError extends Error {
  constructor(message: string = "Service Unavailable") {
    super(message);
    this.name = this.constructor.name;
  }
}
