import { Context } from "koa";
import { HandleErrors } from "../../../errors/handle_errors";
import { utils } from "../../../utils/utils";
import { CreateCartTransformer } from "./transformers";
import { ValidateCreateCart } from "./validators";
import { CartSvc } from "../../../services/cart/interface";

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */
interface Interface {
}

/* -------------------------------------------------------------------------- */
/*                                    Class                                   */
/* -------------------------------------------------------------------------- */
class Cart implements Interface {
  /* ------------------------- CREATE ORDER CONTROLLER ------------------------ */
  async Createcart(ctx: Context): Promise<void> {
    try {
      // Validate request
      const validatedReq = await ValidateCreateCart(ctx);

      // Call your service function
      let cartSvc = new CartSvc();
      const createCartRes = await cartSvc.CreateCart(ctx, validatedReq);

      // Transform response
      const finalRes = CreateCartTransformer(createCartRes);

      // Return response
      await utils.JsonResponse(ctx, finalRes);
    } catch (error: any) {
      // handle all errors
      HandleErrors(ctx, error);
    }
  }
}

export { Cart };
