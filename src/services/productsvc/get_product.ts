import * as models from "../../models/models";
import { Context } from "koa";
import { ServerError } from "../../errors/errors";
import { http } from "../../constants/status_codes";
import { Product } from "../../entities/products";
import { ProductsDBImpl } from "../../dbops/products";

interface GetProductObj {
  baseRes: models.BaseRes;
  product: Product;
}

async function GetProduct(ctx: Context, reqBody: models.GetProductReq): Promise<GetProductObj> {
  let product: Product = {};
  let res: GetProductObj = {
    baseRes: {},
    product: {},
  };

  // initialize
  res.baseRes.success = false;
  res.baseRes.status_code = http.StatusInternalServerError;
  res.baseRes.message = "faliure";

  try {
    // map data
    product.PID = reqBody.product_id;

    let productDB = new ProductsDBImpl();
    product = await productDB.GetProductByPID(ctx, product.PID);

    // assign values
    res.product = product;

    res.baseRes.success = true;
    res.baseRes.status_code = http.StatusOK;
    res.baseRes.message = "";

    return res;
  } catch (error) {
    throw new ServerError("[GetProduct][ProductSvc]: " + error);
  }
}

export { GetProduct, GetProductObj };
