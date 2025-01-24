import { Context } from "koa";
import * as models from "../../../models/models";
import { ValidationError } from "../../../errors/errors";


/* ------------------------- CREATE CART VALIDATOR ------------------------ */
async function ValidateCreateCart(ctx: Context): Promise<models.CreateCartReq> {
  try {
    // Parse JSON
    const cartReq = ctx.request.body as models.CreateCartReq;

    // set default values
    const reqBody: models.CreateCartReq = {
      user_id: cartReq.user_id,
      items: cartReq.items
    };

    // validate name
    await validateItems(ctx, reqBody.items);

    return reqBody;
  } catch (error: any) {
    throw new ValidationError(error.message);
  }
}

async function validateItems(ctx: Context, items: Object[]) {
  if (items && items.length <= 0) {
    throw new ValidationError("items list is empty");
  }
}

export { ValidateCreateCart };
