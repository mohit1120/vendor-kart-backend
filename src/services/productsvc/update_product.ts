import { Product } from "../../entities/products";
import * as models from "../../models/models";
import { http } from "../../constants/status_codes";
import { ProductsDBImpl } from "../../dbops/products";
import { ServerError } from "../../errors/errors";
import { Context } from "koa";

interface UpdateProductObj {
  baseRes: models.BaseRes;
  product: Product;
}

async function UpdateProduct(ctx: Context, reqBody: models.UpdateProductReq): Promise<UpdateProductObj> {
  let product: Product = {};
  let res: UpdateProductObj = {
    baseRes: {},
    product: {},
  };

  // initialize
  res.baseRes.success = false;
  res.baseRes.status_code = http.StatusInternalServerError;
  res.baseRes.message = "faliure";

  try {
    // map data
    if(reqBody.product_id){
      product.PID = reqBody.product_id
    }
    if (reqBody.description) {
      product.Description = reqBody.description;
    }
    if (reqBody.price) {
      product.Price = reqBody.price;
    }
    if (reqBody.qty) {
      product.Qty = reqBody.qty;
    }
  
    let productDB = new ProductsDBImpl();
    await productDB.UpdateProduct(ctx, product);

    // get updated product
    if(product.PID){
      product = await productDB.GetProductByPID(ctx, product.PID);
    }

    // assign values
    res.product = product;

    res.baseRes.success = true;
    res.baseRes.status_code = http.StatusOK;
    res.baseRes.message = "product updated sucessfully";

    return res;
  } catch (error) {
    throw new ServerError("[updateProduct][ProductSvc]: " + error);
  }
}

export { UpdateProduct, UpdateProductObj };
