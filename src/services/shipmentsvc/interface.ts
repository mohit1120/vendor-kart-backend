import * as models from "../../models/models";
import { Context } from "koa";
import { GetShipment, GetShipmentObj } from "./get_shipment";

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */
interface Interface {
  GetShipment(ctx: Context, reqBody: models.GetShipmentReq): Promise<GetShipmentObj>
}

/* -------------------------------------------------------------------------- */
/*                                    class                                   */
/* -------------------------------------------------------------------------- */
class ShipmentSvc implements Interface {
  async GetShipment(ctx: Context, reqBody: models.GetShipmentReq): Promise<GetShipmentObj>{
    return await GetShipment(ctx, reqBody);
  }
}

export { Interface, ShipmentSvc };
