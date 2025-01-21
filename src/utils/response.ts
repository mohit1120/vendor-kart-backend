import { Context } from "koa";

async function JsonResponse(ctx: Context, response: any): Promise<void> {
  ctx.status = 200;
  ctx.body = response;
}

export { JsonResponse };
