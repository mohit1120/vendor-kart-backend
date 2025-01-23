import * as models from "../../models/models";
import { Context } from "koa";
import { ServerError } from "../../errors/errors";
import { http } from "../../constants/status_codes";
import { Database } from "../../database/connection";
import { Cart } from "../../entities/carts";
import { CartDBImpl } from "../../dbops/cart";
import { CartLineItem } from "../../entities/cart_line_items";

interface CreateCartObj {
  baseRes: models.BaseRes;
  cart: Cart;
  items: models.Item[];
}

async function CreateCart(ctx: Context, reqBody: models.CreateCartReq): Promise<CreateCartObj> {
 let cartItem: CartLineItem = {}
    let cart: Cart = {};
    let res: CreateCartObj = {
      baseRes: {},
      cart: {},
      items: []
    };

  // initialize
  res.baseRes.success = false;
  res.baseRes.status_code = http.StatusInternalServerError;
  res.baseRes.message = "faliure";

  // create transaction to create order ansd order items
  const transaction = await Database.getInstance().getSequelize().transaction();
  try {
    // create cart
    cart.UserID = reqBody.user_id; 
    const cartDB =  new CartDBImpl();
    cart = await cartDB.CreateCart(ctx, cart, transaction) 
    
    // create cart line items
    cartItem.CartID = cart.PID;
    for(let i = 0; i < reqBody.items.length; i++){
      cartItem.ProductID = reqBody.items[i].product_id;
      cartItem.Price = reqBody.items[i].price;
      cartItem.Qty = reqBody.items[i].qty
      cartItem.UserID = reqBody.user_id;
      const cartItemsDB = new CartDBImpl();
      await cartItemsDB.CreateCartLineItem(ctx, cartItem, transaction)
    }
    // assign values
    res.cart = cart

    res.baseRes.success = true;
    res.baseRes.status_code = http.StatusOK;
    res.baseRes.message = "cart created sucessfully";

    // Commit the transaction if everything is successful
    await transaction.commit()
    return res;
  } catch (error) {
    await transaction.rollback();
    throw new ServerError("[CreateCart][CartSvc]: " + error);
  }
}

export { CreateCart, CreateCartObj }