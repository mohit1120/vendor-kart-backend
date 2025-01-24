import { Context } from "koa";
import * as models from "../../../models/models";
import { ValidationError } from "../../../errors/errors";
import { OrdersDBImpl } from "../../../dbops/order";


/* ------------------------- CREATE ORDER VALIDATOR ------------------------ */
async function ValidateCreateOrder(ctx: Context): Promise<models.CreateOrderReq> {
  try {
    // Parse JSON
    const orderReq = ctx.request.body as models.CreateOrderReq;

    // set default values
    const reqBody: models.CreateOrderReq = {
      user_id: orderReq.user_id,
      items: orderReq.items
    };

    // validate name
    await validateItems(ctx, reqBody.items);

    return orderReq;
  } catch (error: any) {
    throw new ValidationError(error.message);
  }
}

/* ------------------------- GET ORDER VALIDATOR ------------------------ */
async function ValidateGetOrder(ctx: Context): Promise<models.GetOrderReq> {
  try {
    // Params
    const orderReq = ctx.params as models.GetOrderReq;

    // set default values
    const reqParams: models.GetOrderReq = {
      order_id: orderReq.order_id || "",
    };

    // validate order exists or not
    await validateOrderPID(ctx, reqParams.order_id);

    return orderReq;
  } catch (error: any) {
    throw new ValidationError(error.message);
  }
}

async function validateItems(ctx: Context, items: Object[]) {
  if (items && items.length <= 0) {
    throw new ValidationError("items list is empty");
  }
}

async function validateOrderPID(ctx: Context, orderID: string) {
  if (orderID == "") {
    throw new ValidationError("order_id field is required");
  }

  // make a db to check product exists or not
  const orderDB = new OrdersDBImpl();
  const order = await orderDB.GetOrderByPID(ctx, orderID)

  if(!order){
    throw new ValidationError("invalid order_id")
  }
}

export { ValidateCreateOrder, ValidateGetOrder };
