import * as models from "../../models/models";
import { Context } from "koa";
import { ServerError } from "../../errors/errors";
import { http } from "../../constants/status_codes";
import { Product } from "../../entities/products";
import { ProductsDBImpl } from "../../dbops/products";

interface ListProductsObj {
  baseRes: models.BaseRes;
  products: Product[];
}

async function ListProductsByvendor(ctx: Context, reqBody: models.ListProducts): Promise<ListProductsObj> {
  let products: Product[] = [];
  let res: ListProductsObj = {
    baseRes: {},
    products: [],
  };

  // initialize
  res.baseRes.success = false;
  res.baseRes.status_code = http.StatusInternalServerError;
  res.baseRes.message = "faliure";

  try {
    let productDB = new ProductsDBImpl();
    products = await productDB.ListProductsByVendor(ctx, reqBody.vendor_id);
    // assign values
    res.products = products;

    res.baseRes.success = true;
    res.baseRes.status_code = http.StatusOK;
    res.baseRes.message = "";

    return res;
  } catch (error) {
    throw new ServerError("[ListProductsByvendor][ProductsSvc]: " + error);
  }
}

export { ListProductsByvendor, ListProductsObj };
