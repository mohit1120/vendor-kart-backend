import { Context } from "koa";
import * as models from "../../../models/models";
import { ValidationError } from "../../../errors/errors";
import { ShipmentsDBImpl } from "../../../dbops/shipment";


/* ------------------------- GET SHIPMENR VALIDATOR ------------------------ */
async function ValidateGetShipment(ctx: Context): Promise<models.GetShipmentReq> {
  try {
    // Parse JSON
    const shipmentReq = ctx.params as models.GetShipmentReq

    // set default values
    const reqParams: models.GetShipmentReq = {
      tracking_no: shipmentReq.tracking_no
    };

    // validate shipment exists or not
    await  validateShipment(ctx, reqParams.tracking_no)
  
    return shipmentReq;
  } catch (error: any) {
    throw new ValidationError(error.message);
  }
}

async function validateShipment(ctx: Context, trackingNo: string) {
  if (trackingNo == "") {
    throw new ValidationError("tracking no field is required");
  }

  // make a db to check shipment exists or not
  const shipmentDB = new ShipmentsDBImpl();
  const shipment = await shipmentDB.GetShipmentByTracingNo(ctx, trackingNo)

  if(!shipment){
    throw new ValidationError("No shipment exists with provided tracking no")
  }
}



export { ValidateGetShipment };
