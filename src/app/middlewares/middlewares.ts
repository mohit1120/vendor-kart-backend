import { Context, Next } from "koa";
import { utils } from "../../utils/utils";
import { constants } from "../../constants/constants";
import { LogsDBImpl } from "../../dbops/request_response_logs";
import { RequestResponseLog } from "../../entities/request_response_logs";

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */
interface Interface {
  AddTraceID(ctx: Context, next: Next): Promise<void>;
  ReqResLogs(ctx: Context, next: Next): Promise<void>;
}

/* -------------------------------------------------------------------------- */
/*                              MIDDLEWARE CLASS                              */
/* -------------------------------------------------------------------------- */

class MiddlewareClass implements Interface {
  /* ------------------------------ ADD TRACE ID ------------------------------ */

  AddTraceID(ctx: Context, next: Next): Promise<void> {
    let traceID = ctx.request.headers[constants.headers.TraceID];
    if (!traceID || traceID === "") {
      const uuid = utils.GeneratePrefixedUUID("");
      traceID = uuid;
    }
    // ctx.set(constants.headers.TraceID, traceID);
    ctx.request.header[constants.headers.TraceID] = traceID;
    ctx.res.setHeader(constants.headers.TraceID, traceID);
    console.log("in trace id", traceID);

    return next();
  }

  /* -------------------- REQUEST RESPONSE LOGS MIDDLEWARE -------------------- */

  async ReqResLogs(ctx: Context, next: Next): Promise<void> {
    try {
      let log: RequestResponseLog = {};

      // map data
      log.LogType = "Request"; // or 'Response' based on when this middleware is called
      log.Method = ctx.request.method;
      log.RequestBodyLength = ctx.request.length;
      log.RequestBody = ctx.body || "";
      log.EndPoint = ctx.request.originalUrl;
      log.HostURL = ctx.request.get("host");
      log.ClientIP = ctx.request.ip;
      log.RemoteIP = ctx.request.ip; // Assuming remote IP is the same as client IP in Koa
      log.Params = JSON.stringify(ctx.params);
      log.QueryParam = JSON.stringify(ctx.query);
      log.ContentType = ctx.request.get("Content-Type") || "";
      log.IsSandbox = ctx.request.headers["is-sandbox"] === "true";
      log.TraceID = ctx.request.headers[constants.headers.TraceID] as string;

      // Make entry in database after getting response
      await next();

      log.ResponseBody = ctx.body || "";
      log.ResponseBodyLength = ctx.length;
      log.ResponseCode = ctx.response.status;

      const logDB = new LogsDBImpl();
      await logDB.CreateLog(ctx, log);
    } catch (error: any) {
      console.log(error);
      // HandleErrors(ctx, error);
    }
  }
}

export { MiddlewareClass };
