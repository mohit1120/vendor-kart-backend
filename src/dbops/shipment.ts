import { utils } from "../utils/utils";
import { ServerError } from "../errors/errors";
import { Context } from "koa";
import { Shipment, Shipments } from "../entities/shipments";

/* -------------------------------------------------------------------------- */
/*                                  INTERFACE                                 */
/* -------------------------------------------------------------------------- */
interface Interface {
    GetShipmentByTracingNo(ctx: Context, trackingId: string): Promise<Shipment>;
}

/* -------------------------------------------------------------------------- */
/*                                    CLASS                                   */
/* -------------------------------------------------------------------------- */
class ShipmentsDBImpl implements Interface {

  /* ------------------------- GET ORDER DETAILS BY PID ------------------------- */
  async GetShipmentByTracingNo(ctx: Context, trackingNo: string): Promise<Shipment> {
    try {
      const orderShipmentDetails = await Shipments.findOne({ where: { TrackingNo: trackingNo} });
      const res = orderShipmentDetails?.toJSON() as Shipment;

      return res;
    } catch (error) {
      throw new ServerError("[GetShipmentByTracingNo][ShipmentsDBImpl]: " + error);
    }
  }
}

export { ShipmentsDBImpl };