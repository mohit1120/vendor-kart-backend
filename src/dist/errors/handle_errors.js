"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleErrors = HandleErrors;
const slack_1 = require("../app/slack/slack");
const errors_1 = require("./errors");
/* ------------------------------ HANDLE ERRORS ----------------------------- */
function HandleErrors(ctx, err) {
    let errorResponse;
    switch (true) {
        case err instanceof errors_1.ValidationError: {
            const error = new errors_1.ValidationError(err.message);
            errorResponse = {
                error: {
                    code: error.code,
                    message: error.message,
                    type: error.type,
                },
            };
            break;
        }
        case err instanceof errors_1.UnauthorizedError: {
            const error = new errors_1.UnauthorizedError(err.message);
            errorResponse = {
                error: {
                    code: error.code,
                    message: error.message,
                    type: error.type,
                },
            };
            break;
        }
        case err instanceof errors_1.DownstreamError: {
            const error = new errors_1.DownstreamError(err.message);
            errorResponse = {
                error: {
                    code: error.code,
                    message: error.message,
                    type: error.type,
                },
            };
            break;
        }
        default: {
            const error = new errors_1.ServerError(err.message);
            errorResponse = {
                error: {
                    code: error.code,
                    message: error.message,
                    type: error.type,
                },
            };
            break;
        }
    }
    // slack notify
    let slackReq = {
        Ctx: ctx,
        ErrorType: errorResponse.error.type,
        StatusCode: errorResponse.error.code,
        Message: errorResponse.error.message,
    };
    (0, slack_1.Notify)(slackReq);
    // update server and downstream message
    if (errorResponse.error.code == 500) {
        errorResponse.error.message = "something went wrong";
    }
    if (errorResponse.error.code == 550) {
        errorResponse.error.message = "provider is down";
    }
    sendErrorResponse(ctx, errorResponse.error.code, errorResponse);
}
function sendErrorResponse(ctx, statusCode, errorResponse) {
    ctx.status = statusCode;
    ctx.body = errorResponse;
}
