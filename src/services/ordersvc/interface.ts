import * as models from "../../models/models";
import { Context } from "koa";
import { CreateOrder, CreateOrderObj } from "./create_order";
import { GetOrder, GetOrderObj } from "./get_order";

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */
interface Interface {
  CreateOrder(ctx: Context, reqBody: models.CreateOrderReq): Promise<CreateOrderObj>
  GetOrder(ctx: Context, reqBody: models.GetOrderReq): Promise<GetOrderObj>
}

/* -------------------------------------------------------------------------- */
/*                                    class                                   */
/* -------------------------------------------------------------------------- */
class OrderSvc implements Interface {
  async CreateOrder(ctx: Context, reqBody: models.CreateOrderReq): Promise<CreateOrderObj> {
    return await CreateOrder(ctx, reqBody);
  }

  async GetOrder(ctx: Context, reqBody: models.GetOrderReq): Promise<GetOrderObj>{
    return await GetOrder(ctx, reqBody);
  }
}

export { Interface, OrderSvc };
