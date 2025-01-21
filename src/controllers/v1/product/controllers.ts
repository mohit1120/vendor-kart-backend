import { Context } from "koa";
import { HandleErrors } from "../../../errors/handle_errors";
import { utils } from "../../../utils/utils";
import { ValidateCreateProduct, ValidateGetProduct, ValidateListProduct, ValidateUpdateProduct } from "./validators";
import { ProductSvc } from "../../../services/productsvc/interface";
import { CreateProductTransformer, GetProductTransformer, ListProductsTransformer, UpadteProductTransformer } from "./transformers";

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */
interface Interface {
  CreateProduct(ctx: Context): Promise<void>;
  GetProduct(ctx: Context): Promise<void>;
  UpdateProduct(ctx: Context): Promise<void>;
  ListProductsByVendor(ctx: Context): Promise<void>
}

/* -------------------------------------------------------------------------- */
/*                                    Class                                   */
/* -------------------------------------------------------------------------- */
class Product implements Interface {
  /* ------------------------- CREATE PRODUCT CONTROLLER ------------------------ */

  async CreateProduct(ctx: Context): Promise<void> {
    try {
      // Validate request
      const validatedReq = await ValidateCreateProduct(ctx);

      // Call your service function
      let productSvc = new ProductSvc();
      const createProductRes = await productSvc.CreateProduct(ctx, validatedReq);

      // Transform response
      const finalRes = CreateProductTransformer(createProductRes);

      // Return response
      await utils.JsonResponse(ctx, finalRes);
    } catch (error: any) {
      // handle all errors
      HandleErrors(ctx, error);
    }
  }

  /* ------------------------- GET PRODUCT CONTROLLER ------------------------ */
  async GetProduct(ctx: Context): Promise<void> {
    try {
      // Validate request
      const validatedReq = await ValidateGetProduct(ctx);

      // Call your service function
      let productSvc = new ProductSvc();
      const getProductRes = await productSvc.GetProduct(ctx, validatedReq);

      // Transform response
      const finalRes = GetProductTransformer(getProductRes);

      // Return response
      await utils.JsonResponse(ctx, finalRes);
    } catch (error: any) {
      // handle all errors
      HandleErrors(ctx, error);
    }
  }

  /* ------------------------- UPDATE PRODUCT CONTROLLER ------------------------ */
  async UpdateProduct(ctx: Context): Promise<void> {
    try {
      // Validate request
      const validatedReq = await ValidateUpdateProduct(ctx);

      // call your service function
      let productSvc = new ProductSvc();
      let updateProductRes = await productSvc.UpdateProduct(ctx, validatedReq);

      // Transform response
      const finalRes = UpadteProductTransformer(updateProductRes);

      // Return response
      await utils.JsonResponse(ctx, finalRes);
    } catch (error: any) {
      // handle all errors
      HandleErrors(ctx, error);
    }
  }

  /* ------------------------- LIST PRODUCT CONTROLLER ------------------------ */
  async ListProductsByVendor(ctx: Context): Promise<void> {
    try {

       // Validate request
       const validatedReq = await ValidateListProduct(ctx);

      // call your service function
      let productSvc = new ProductSvc();
      let listProductRes = await productSvc.ListProductsByvendor(ctx, validatedReq);

      // Transform response
      const finalRes = ListProductsTransformer(listProductRes);

      // Return response
      await utils.JsonResponse(ctx, finalRes);
    } catch (error: any) {
      // handle all errors
      HandleErrors(ctx, error);
    }
  }
}

export { Product };
