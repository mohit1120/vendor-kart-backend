import * as models from "../../../models/models";
import { CreateCartObj } from "../../../services/cart/create_cart";

/* ------------------------ CREATE CART TRANSFORMER ------------------------ */
function CreateCartTransformer(data: CreateCartObj): models.BaseRes {
  let res: models.CreateCartRes = {};
  var baseRes: models.BaseRes = {};

  res.cart_id = data.cart.PID;
  res.user_id = data.cart.UserID;
  res.created_at = data.cart.CreatedAt
  res.updated_at = data.cart.UpdatedAt

  baseRes.message = data.baseRes.message;
  baseRes.status_code = data.baseRes.status_code;
  baseRes.data = res;
  baseRes.success = data.baseRes.success;

  return baseRes;
}

export { CreateCartTransformer };
