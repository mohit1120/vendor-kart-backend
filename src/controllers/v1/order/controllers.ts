import { Context } from "koa";
import { HandleErrors } from "../../../errors/handle_errors";
import { utils } from "../../../utils/utils";
import { ValidateCreateOrder, ValidateGetOrder } from "./validators";
import { OrderSvc } from "../../../services/ordersvc/interface";
import { CreateOrderTransformer, GetOrderTransformer } from "./transformers";

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */
interface Interface {
}

/* -------------------------------------------------------------------------- */
/*                                    Class                                   */
/* -------------------------------------------------------------------------- */
class Order implements Interface {
  /* ------------------------- CREATE ORDER CONTROLLER ------------------------ */

  async CreateOrder(ctx: Context): Promise<void> {
    try {
      // Validate request
      const validatedReq = await ValidateCreateOrder(ctx);

      // Call your service function
      let orderSvc = new OrderSvc();
      const createOrderRes = await orderSvc.CreateOrder(ctx, validatedReq);

      // Transform response
      const finalRes = CreateOrderTransformer(createOrderRes);

      // Return response
      await utils.JsonResponse(ctx, finalRes);
    } catch (error: any) {
      // handle all errors
      HandleErrors(ctx, error);
    }
  }

  /* ------------------------- GET ORDER CONTROLLER ------------------------ */
  async GetOrder(ctx: Context): Promise<void> {
    try {
      // Validate request
      const validatedReq = await ValidateGetOrder(ctx);

      // Call your service function
      let orderSvc = new OrderSvc();
      const getOrderRes = await orderSvc.GetOrder(ctx, validatedReq);

      // Transform response
      const finalRes = GetOrderTransformer(getOrderRes);

      // Return response
      await utils.JsonResponse(ctx, finalRes);
    } catch (error: any) {
      // handle all errors
      HandleErrors(ctx, error);
    }
  }
}

export { Order };
