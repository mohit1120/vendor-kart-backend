import * as models from "../../../models/models";
import { CreateOrderObj } from "../../../services/ordersvc/create_order";
import { GetOrderObj } from "../../../services/ordersvc/get_order";
import { GetProductObj } from "../../../services/productsvc/get_product";
import { GetShipmentObj } from "../../../services/shipmentsvc/get_shipment";

/* -------------- GET SHIPMENT TRANSFORMER ------------------------ */
function GetShipmentTransformer(data: GetShipmentObj): models.BaseRes {
  let res: models.GetShipmentRes = {};
  var baseRes: models.BaseRes = {};

  res.shipment_pid = data.shipment.PID;
  res.order_id = data.shipment.OrderID;
  res.order_item_id = data.shipment.OrderItemID;
  res.status = data.shipment.Status;
  res.created_at = data.shipment.CreatedAt
  res.updated_at = data.shipment.UpdatedAt

  baseRes.message = data.baseRes.message;
  baseRes.status_code = data.baseRes.status_code;
  baseRes.data = res;
  baseRes.success = data.baseRes.success;

  return baseRes;
}

export { GetShipmentTransformer};
