import { Context } from "koa";
import { utils } from "../../../utils/utils";
import { config } from "../../../config/config";

interface Interface {
  OkRouting(ctx: Context): Promise<void>;
}

class Health implements Interface {
  async OkRouting(ctx: Context): Promise<void> {
    await utils.JsonResponse(ctx, { ok: true });
  }
}

export { Health };
