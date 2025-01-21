import { Context } from "koa";
import { constants } from "../constants/constants";

function GetTraceID(ctx: Context) {
  const traceID =
    (ctx.request.headers[constants.headers.TraceID] as string) || "";
  return traceID;
}

export { GetTraceID };
