import * as models from "../../models/models";
import { Context } from "koa";
import { ServerError } from "../../errors/errors";
import { http } from "../../constants/status_codes";
import { Database } from "../../database/connection";
import { Order } from "../../entities/orders";
import { OrdersDBImpl } from "../../dbops/order";
import { OrderItem } from "../../entities/order_items";
import { CartDBImpl } from "../../dbops/cart";

interface CreateOrderObj {
  baseRes: models.BaseRes;
  order: Order;
  items: models.Item[];
}

async function CreateOrder(ctx: Context, reqBody: models.CreateOrderReq): Promise<CreateOrderObj> {
    let order: Order = {};
    let orderItem: OrderItem = {};
    let res: CreateOrderObj = {
      baseRes: {},
      order: {},
      items: []
    };

  // initialize
  res.baseRes.success = false;
  res.baseRes.status_code = http.StatusInternalServerError;
  res.baseRes.message = "faliure";
 // create transaction to create order ansd order items
  const transaction = await Database.getInstance().getSequelize().transaction();
  try {
    // create order
    let totalAmount: number = 0;
    for(let i = 0; i < reqBody.items.length; i++){
        totalAmount = totalAmount + reqBody.items[i].price * reqBody.items[i].qty;
    }
    order.UserID = reqBody.user_id; 
    order.TotalAmount = totalAmount;
    const orderDB =  new OrdersDBImpl();
    order = await orderDB.CreateOrder(ctx, order, transaction) 
    
    // create order items
    orderItem.OrderID = order.PID;
    orderItem.UserID = reqBody.user_id;
    for(let i = 0; i < reqBody.items.length; i++){
        orderItem.ProductID = reqBody.items[i].product_id;
        orderItem.Price = reqBody.items[i].price;
        orderItem.Qty = reqBody.items[i].qty;
        const orderItemsDB = new OrdersDBImpl();
        await orderItemsDB.CreateOrderItems(ctx, orderItem, transaction)
    }

    // delete the cart and cart line items
    const cartDB = new CartDBImpl();
    await cartDB.DeleteCart(ctx, reqBody.user_id, transaction)
    
    await cartDB.DeleteCartLineItem(ctx, reqBody.user_id, transaction);

    // assign values
    res.order = order

    res.baseRes.success = true;
    res.baseRes.status_code = http.StatusOK;
    res.baseRes.message = "order created sucessfully";

    // Commit the transaction if everything is successful
    await transaction.commit()
    return res;
  } catch (error) {
    await transaction.rollback();
    throw new ServerError("[CreateOrder][OrderSvc]: " + error);
  }
}

export { CreateOrder, CreateOrderObj };
