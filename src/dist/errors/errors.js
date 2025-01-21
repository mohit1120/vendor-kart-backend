"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DownstreamError = exports.UnauthorizedError = exports.ServerError = exports.ValidationError = void 0;
const errors_1 = require("../constants/errors");
/* -------------------------- VALIDATION ERROR 422 -------------------------- */
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.code = 422;
        this.type = errors_1.errorType.validation;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ValidationError = ValidationError;
/* ------------------------- UNAUTHORIZED ERROR 401 ------------------------- */
class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.code = 401;
        this.type = errors_1.errorType.unauthorized;
        Error.captureStackTrace(this, this.constructor);
        console.error(message);
    }
}
exports.UnauthorizedError = UnauthorizedError;
/* ------------------------ INTERNAL SERVER ERROR 500 ----------------------- */
class ServerError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.code = 500;
        this.type = errors_1.errorType.server;
        Error.captureStackTrace(this, this.constructor);
        console.error(message);
    }
}
exports.ServerError = ServerError;
/* -------------------------- DOWNSTREAM ERROR 550 -------------------------- */
class DownstreamError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.code = 550;
        this.type = errors_1.errorType.downstream;
        Error.captureStackTrace(this, this.constructor);
        console.error(message);
    }
}
exports.DownstreamError = DownstreamError;
