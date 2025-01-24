import { utils } from "../utils/utils";
import { ServerError } from "../errors/errors";
import { Context } from "koa";
import { Product, Products } from "../entities/products";
import { Categories } from "../entities/categories";
import { Vendors } from "../entities/vendors";

/* -------------------------------------------------------------------------- */
/*                                  INTERFACE                                 */
/* -------------------------------------------------------------------------- */
interface Interface {
    GetVendorByPID(ctx: Context, vendorPID: string): Promise<Product>}

/* -------------------------------------------------------------------------- */
/*                                    CLASS                                   */
/* -------------------------------------------------------------------------- */
class VendorsDBImpl implements Interface {

  /* ------------------------- GET PRODUCT DETAILS BY PID ------------------------- */
  async GetVendorByPID(ctx: Context, vendorPID: string): Promise<Product> {
    try {
      const Product = await Vendors.findOne({ where: { PID:  vendorPID} });
      const res = Product?.toJSON() as Product;

      return res;
    } catch (error) {
      throw new ServerError("[GetVendorByPID][VendorsDBImpl]: " + error);
    }
  }
}

export { VendorsDBImpl };
