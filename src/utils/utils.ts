import { GeneratePrefixedUUID } from "./uuid";
import { GetTraceID } from "./trace_id";
import { Context } from "koa";
import { JsonResponse } from "./response";

/* -------------------------------- Interface ------------------------------- */
interface Interface {
  GeneratePrefixedUUID(prefix: string): string;
  GetTraceID(ctx: Context): string;
  JsonResponse(ctx: Context, response: any): Promise<void>;
}

/* ------------------------------- Util Class ------------------------------- */
class UtilClass implements Interface {
  GeneratePrefixedUUID(prefix: string): string {
    return GeneratePrefixedUUID(prefix);
  }
  GetTraceID(ctx: Context): string {
    return GetTraceID(ctx);
  }

  async JsonResponse(ctx: Context, response: any): Promise<void> {
    return await JsonResponse(ctx, response);
  }
}
/* --------------------------------- Export --------------------------------- */
const utils = new UtilClass();

export { utils };
