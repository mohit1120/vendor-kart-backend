import { utils } from "../utils/utils";
import { ServerError } from "../errors/errors";
import { Context } from "koa";
import { Product } from "../entities/products";
import { Order, Orders } from "../entities/orders";
import { OrderItem, OrderItems } from "../entities/order_items";
import { Transaction } from "sequelize";

/* -------------------------------------------------------------------------- */
/*                                  INTERFACE                                 */
/* -------------------------------------------------------------------------- */
interface Interface {
    CreateOrder(ctx: Context, OrderData: Order, transaction: Transaction): Promise<Order>;
    GetOrderByPID(ctx: Context, orderPID: string): Promise<Order>;
    CreateOrderItems(ctx: Context, OrderItemsData: OrderItem, transaction: Transaction): Promise<OrderItems>
}

/* -------------------------------------------------------------------------- */
/*                                    CLASS                                   */
/* -------------------------------------------------------------------------- */
class OrdersDBImpl implements Interface {

  /* ---------------------------- CREATE ORDER ------------------------------- */
  async CreateOrder(ctx: Context, OrderData: Order, transaction: Transaction): Promise<Order> {
    try {
      OrderData.PID = utils.GeneratePrefixedUUID("order");
      const order = await Orders.create(OrderData, { transaction });

      const res: Product = order.toJSON() as Product;

      return res;
    } catch (error) {
      throw new ServerError("[CreateOrder][OrdersDBImpl]: " + error);
    }
  }

  /* ------------------------- GET ORDER DETAILS BY PID ------------------------- */
  async GetOrderByPID(ctx: Context, orderPID: string): Promise<Order> {
    try {
      const order = await Orders.findOne({ where: { PID: orderPID } });
      const res = order?.toJSON() as Product;

      return res;
    } catch (error) {
      throw new ServerError("[GetOrderByPID][OrdersDBImpl]: " + error);
    }
  }

  /* ---------------------------- CREATE ORDER ITEMS  ------------------------------- */
  async CreateOrderItems(ctx: Context, OrderItemsData: OrderItem, transaction: Transaction): Promise<OrderItems> {
    try {
      OrderItemsData.PID = utils.GeneratePrefixedUUID("order_item");
      const orderItem  = await OrderItems.create(OrderItemsData, { transaction });
      const res = orderItem?.toJSON() as OrderItems;

      return res;
    // run a transaction to create order and order items 
    } catch (error) {
      throw new ServerError("[CreateOrder][OrdersDBImpl]: " + error);
    }
  }
}

export { OrdersDBImpl };
