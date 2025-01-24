import { Context } from "koa";
import { HandleErrors } from "../../../errors/handle_errors";
import { utils } from "../../../utils/utils";
import { ValidateGetShipment } from "./validators";
import { ShipmentSvc } from "../../../services/shipmentsvc/interface";
import { GetShipmentTransformer } from "./transformers";

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */
interface Interface {
}

/* -------------------------------------------------------------------------- */
/*                                    Class                                   */
/* -------------------------------------------------------------------------- */
class Shipment implements Interface {

  /* ------------------------- GET ORDER CONTROLLER ------------------------ */
  async GetShipment(ctx: Context): Promise<void> {
    try {
      // Validate request
      const validatedReq = await ValidateGetShipment(ctx);

      // Call your service function
      let shipmentSvc = new ShipmentSvc();
      const getShipemntRes = await shipmentSvc.GetShipment(ctx, validatedReq);

      // Transform response
      const finalRes = GetShipmentTransformer(getShipemntRes);

      // Return response
      await utils.JsonResponse(ctx, finalRes);
    } catch (error: any) {
      // handle all errors
      HandleErrors(ctx, error);
    }
  }
}

export { Shipment };
