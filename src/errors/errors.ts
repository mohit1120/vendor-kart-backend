import { errorType } from "../constants/errors";

/* -------------------------- VALIDATION ERROR 422 -------------------------- */
class ValidationError extends Error {
  code: number;
  type: string;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.code = 422;
    this.type = errorType.validation;
    Error.captureStackTrace(this, this.constructor);
  }
}

/* ------------------------- UNAUTHORIZED ERROR 401 ------------------------- */
class UnauthorizedError extends Error {
  code: number;
  type: string;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.code = 401;
    this.type = errorType.unauthorized;
    Error.captureStackTrace(this, this.constructor);
    console.error(message);
  }
}

/* ------------------------ INTERNAL SERVER ERROR 500 ----------------------- */
class ServerError extends Error {
  code: number;
  type: string;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.code = 500;
    this.type = errorType.server;
    Error.captureStackTrace(this, this.constructor);
    console.error(message);
  }
}
/* -------------------------- DOWNSTREAM ERROR 550 -------------------------- */
class DownstreamError extends Error {
  code: number;
  type: string;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.code = 550;
    this.type = errorType.downstream;
    Error.captureStackTrace(this, this.constructor);
    console.error(message);
  }
}

export { ValidationError, ServerError, UnauthorizedError, DownstreamError };
