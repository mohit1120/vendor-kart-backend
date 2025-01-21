import * as models from "../../models/models";
import { Context } from "koa";
import { ServerError } from "../../errors/errors";
import { http } from "../../constants/status_codes";
import { Product } from "../../entities/products";
import { ProductsDBImpl } from "../../dbops/products";

interface CreateProductObj {
  baseRes: models.BaseRes;
  product: Product;
}

async function CreateProduct(ctx: Context, reqBody: models.CreateProductReq): Promise<CreateProductObj> {
  let product: Product = {};
  let res: CreateProductObj = {
    baseRes: {},
    product: {},
  };

  // initialize
  res.baseRes.success = false;
  res.baseRes.status_code = http.StatusInternalServerError;
  res.baseRes.message = "faliure";

  try {
    // map data
    product.Name = reqBody.name;
    product.Description = reqBody.description;
    product.Price = reqBody.price;
    product.Qty = reqBody.qty;
    product.VendorID = reqBody.vendor_id;
    product.CategoryID = reqBody.category_id;
    
    let productDB = new ProductsDBImpl();
    product = await productDB.CreateProduct(ctx, product);

    // assign values
    res.product = product;

    res.baseRes.success = true;
    res.baseRes.status_code = http.StatusOK;
    res.baseRes.message = "product created sucessfully";

    return res;
  } catch (error) {
    throw new ServerError("[CreateProduct][ProductSvc]: " + error);
  }
}

export { CreateProduct, CreateProductObj };
