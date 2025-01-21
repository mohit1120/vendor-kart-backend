import * as models from "../../models/models";
import { Context } from "koa";
import { CreateProduct, CreateProductObj } from "./create_product";
import { GetProduct, GetProductObj } from "./get_product";
import { UpdateProduct, UpdateProductObj } from "./update_product";
import { ListProductsByvendor, ListProductsObj } from "./list_products_by_vendor";

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */
interface Interface {
  CreateProduct(ctx: Context, reqBody: models.CreateProductReq): Promise<CreateProductObj>
  GetProduct(ctx: Context, reqBody: models.GetProductReq): Promise<GetProductObj>
  UpdateProduct(ctx: Context, reqBody: models.UpdateProductReq): Promise<UpdateProductObj>
  ListProductsByvendor(ctx: Context, reqBody: models.ListProducts): Promise<ListProductsObj>  
}

/* -------------------------------------------------------------------------- */
/*                                    class                                   */
/* -------------------------------------------------------------------------- */
class ProductSvc implements Interface {
  async CreateProduct(ctx: Context, reqBody: models.CreateProductReq): Promise<CreateProductObj> {
    return await CreateProduct(ctx, reqBody);
  }

  async GetProduct(ctx: Context, reqBody: models.GetProductReq): Promise<GetProductObj> {
    return await GetProduct(ctx, reqBody);
  }


  async UpdateProduct(ctx: Context, reqBody: models.UpdateProductReq): Promise<UpdateProductObj> {
    return await UpdateProduct(ctx, reqBody);
  }

  async ListProductsByvendor(ctx: Context, reqBody: models.ListProducts): Promise<ListProductsObj> {
    return await ListProductsByvendor(ctx, reqBody);
  }

}

export { Interface, ProductSvc };
