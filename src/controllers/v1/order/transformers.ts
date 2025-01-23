import * as models from "../../../models/models";
import { CreateOrderObj } from "../../../services/ordersvc/create_order";
import { GetOrderObj } from "../../../services/ordersvc/get_order";
import { GetProductObj } from "../../../services/productsvc/get_product";

/* ------------------------ CREATE ORDER TRANSFORMER ------------------------ */
function CreateOrderTransformer(data: CreateOrderObj): models.BaseRes {
  let res: models.CreateOrderRes = {};
  var baseRes: models.BaseRes = {};

  res.order_id = data.order.PID;
  res.status = data.order.Status;
  res.total_amount = data.order.TotalAmount;
  res.user_id = data.order.UserID;
  res.created_at = data.order.CreatedAt
  res.updated_at = data.order.UpdatedAt

  baseRes.message = data.baseRes.message;
  baseRes.status_code = data.baseRes.status_code;
  baseRes.data = res;
  baseRes.success = data.baseRes.success;

  return baseRes;
}

/* ------------------------ GET ORDER TRANSFORMER ------------------------ */
function GetOrderTransformer(data: GetOrderObj): models.BaseRes {
  let res: models.GetOrderRes = {};
  var baseRes: models.BaseRes = {};

  res.order_id = data.order.PID;
  res.status = data.order.Status;
  res.total_amount = data.order.TotalAmount;
  res.user_id = data.order.UserID;
  res.created_at = data.order.CreatedAt
  res.updated_at = data.order.UpdatedAt

  baseRes.message = data.baseRes.message;
  baseRes.status_code = data.baseRes.status_code;
  baseRes.data = res;
  baseRes.success = data.baseRes.success;

  return baseRes;
}

export { CreateOrderTransformer, GetOrderTransformer};
