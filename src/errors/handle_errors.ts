import { Context } from "koa";
import { Notify } from "../app/slack/slack";
import * as models from "../models/models";
import { ValidationError, ServerError, UnauthorizedError, DownstreamError } from "./errors";

/* ------------------------------ HANDLE ERRORS ----------------------------- */
function HandleErrors(ctx: Context, err: Error) {
  let errorResponse;
  switch (true) {
    case err instanceof ValidationError: {
      const error = new ValidationError(err.message);
      errorResponse = {
        error: {
          code: error.code,
          message: error.message,
          type: error.type,
        },
      };
      break;
    }

    case err instanceof UnauthorizedError: {
      const error = new UnauthorizedError(err.message);
      errorResponse = {
        error: {
          code: error.code,
          message: error.message,
          type: error.type,
        },
      };
      break;
    }
    case err instanceof DownstreamError: {
      const error = new DownstreamError(err.message);
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
      const error = new ServerError(err.message);
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
  let slackReq: models.SlackRequest = {
    Ctx: ctx,
    ErrorType: errorResponse.error.type,
    StatusCode: errorResponse.error.code,
    Message: errorResponse.error.message,
  };
  Notify(slackReq);

  // update server and downstream message
  if (errorResponse.error.code == 500) {
    errorResponse.error.message = "something went wrong";
  }

  if (errorResponse.error.code == 550) {
    errorResponse.error.message = "provider is down";
  }

  sendErrorResponse(ctx, errorResponse.error.code, errorResponse);
}

function sendErrorResponse(ctx: Context, statusCode: number, errorResponse: any): void {
  ctx.status = statusCode;
  ctx.body = errorResponse;
}

export { HandleErrors };
