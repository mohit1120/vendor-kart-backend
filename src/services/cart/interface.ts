import * as models from "../../models/models";
import { Context } from "koa";
import { CreateCart, CreateCartObj } from "./create_cart";

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */
interface Interface {
    CreateCart(ctx: Context, reqBody: models.CreateCartReq): Promise<CreateCartObj>}

/* -------------------------------------------------------------------------- */
/*                                    class                                   */
/* -------------------------------------------------------------------------- */
class CartSvc implements Interface {
  async CreateCart(ctx: Context, reqBody: models.CreateCartReq): Promise<CreateCartObj> {
    return await CreateCart(ctx, reqBody);
  }
}

export { Interface, CartSvc };
