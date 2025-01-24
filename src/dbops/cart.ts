import { Cart, Carts } from "../entities/carts";
import { CartLineItem, CartLineItems } from "../entities/cart_line_items";
import { ServerError } from "../errors/errors";
import { Context } from "koa";
import { utils } from "../utils/utils";
import { Transaction } from "sequelize";

/* -------------------------------------------------------------------------- */
/*                                  INTERFACE                                 */
/* -------------------------------------------------------------------------- */
interface Interface {
    CreateCart(ctx: Context, CartData: Cart, transaction: Transaction): Promise<Cart>;
    CreateCartLineItem(ctx: Context, cartLineItemData: CartLineItem, transaction: any): Promise<CartLineItems>
    DeleteCart(ctx: Context, userID: string, transaction: any): Promise<Number>
    DeleteCartLineItem(ctx: Context, userID: string, transaction: Transaction): Promise<Number>
}

class CartDBImpl implements Interface{

  /* ---------------------------- CREATE CART ------------------------------- */
  async CreateCart(ctx: Context, CartData: Cart, transaction: any): Promise<Cart> {
    try {
      CartData.PID = utils.GeneratePrefixedUUID("cart");
      const cart = await Carts.create(CartData, {transaction});

      return cart.toJSON() as Cart;
    } catch (error) {
      throw new ServerError("[CreateCart][CartDBImpl]: " + error);
    }
  }

  /* ---------------------------- CREATE CART LINE ITEM ------------------------------- */
  async CreateCartLineItem(ctx: Context, cartLineItemData: CartLineItem, transaction: Transaction): Promise<CartLineItems> {
    try {
      cartLineItemData.PID = utils.GeneratePrefixedUUID("cart_line_item");
      const cartItem  = await CartLineItems.create(cartLineItemData, { transaction });
      const res = cartItem?.toJSON() as CartLineItems;

      return res;
    } catch (error) {
      throw new ServerError("[CreateCartLineItem][CartDBImpl]: " + error);
    }
  }

  /* ---------------------------- DELETE CART ------------------------------- */
  async DeleteCart(ctx: Context, userID: string, transaction: any): Promise<Number> {
    try {
      const res = await Carts.destroy({where: {
        UserID: userID
      }, transaction});

     return res;
    } catch (error) {
      throw new ServerError("[CreateCart][CartDBImpl]: " + error);
    }
  }

  /* ---------------------------- DELETE CART LINE ITEM ------------------------------- */
  async DeleteCartLineItem(ctx: Context, userID: string, transaction: Transaction): Promise<Number> {
    try {
      const res  = await CartLineItems.destroy({where:{
        UserID: userID
      }, transaction})

      return res;
    } catch (error) {
      throw new ServerError("[CreateCartLineItem][CartDBImpl]: " + error);
    }
  }
}

export { CartDBImpl }