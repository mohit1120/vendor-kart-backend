import * as models from "../../models/models";
import { Context } from "koa";
import { ServerError } from "../../errors/errors";
import { http } from "../../constants/status_codes";
import { Shipment } from "../../entities/shipments";
import { ShipmentsDBImpl } from "../../dbops/shipment";

interface GetShipmentObj {
  baseRes: models.BaseRes;
  shipment: Shipment;
}

async function GetShipment(ctx: Context, reqBody: models.GetShipmentReq): Promise<GetShipmentObj> {
  let shipment: Shipment = {};
  let res: GetShipmentObj = {
    baseRes: {},
    shipment: {},
  };

  // initialize
  res.baseRes.success = false;
  res.baseRes.status_code = http.StatusInternalServerError;
  res.baseRes.message = "faliure";

  try {
    // map data
    shipment.TrackingNo = reqBody.tracking_no;

    let shipmentDB = new ShipmentsDBImpl();
    shipment = await shipmentDB.GetShipmentByTracingNo(ctx, shipment.TrackingNo);

    // assign values
    res.shipment = shipment;

    res.baseRes.success = true;
    res.baseRes.status_code = http.StatusOK;
    res.baseRes.message = "";

    return res;
  } catch (error) {
    throw new ServerError("[GetShipment][ShipmentSvc]: " + error);
  }
}

export { GetShipment, GetShipmentObj };
