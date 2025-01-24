import * as models from "../../models/models";
import { Context } from "koa";
import { ServerError } from "../../errors/errors";
import { http } from "../../constants/status_codes";
import { Order } from "../../entities/orders";
import { OrdersDBImpl } from "../../dbops/order";

interface GetOrderObj {
  baseRes: models.BaseRes;
  order: Order;
}

async function GetOrder(ctx: Context, reqBody: models.GetOrderReq): Promise<GetOrderObj> {
  let order: Order = {};
  let res: GetOrderObj = {
    baseRes: {},
    order: {},
  };

  // initialize
  res.baseRes.success = false;
  res.baseRes.status_code = http.StatusInternalServerError;
  res.baseRes.message = "faliure";

  try {
    // map data
    order.PID = reqBody.order_id;

    let orderDB = new OrdersDBImpl();
    order = await orderDB.GetOrderByPID(ctx, order.PID);

    // assign values
    res.order = order;

    res.baseRes.success = true;
    res.baseRes.status_code = http.StatusOK;
    res.baseRes.message = "";

    return res;
  } catch (error) {
    throw new ServerError("[GetOrder][OrderSvc]: " + error);
  }
}

export { GetOrder, GetOrderObj };
