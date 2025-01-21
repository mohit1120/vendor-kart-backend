import { utils } from "../utils/utils";
import { ServerError } from "../errors/errors";
import { Context } from "koa";
import { Product, Products } from "../entities/products";

/* -------------------------------------------------------------------------- */
/*                                  INTERFACE                                 */
/* -------------------------------------------------------------------------- */
interface Interface {
  CreateProduct(ctx: Context, ProductData: Product): Promise<Product>;
  GetProductByPID(ctx: Context, ProductPID: string): Promise<Product>;
  UpdateProduct(ctx: Context, updateProduct: Product): Promise<Number>;
  ListProductsByVendor(ctx: Context, vendorId: string): Promise<Product[]>;
}

/* -------------------------------------------------------------------------- */
/*                                    CLASS                                   */
/* -------------------------------------------------------------------------- */
class ProductsDBImpl implements Interface {

  /* ------------------------------- CREATE PRODUCT ------------------------------- */
  async CreateProduct(ctx: Context, ProductData: Product): Promise<Product> {
    try {
      ProductData.PID = utils.GeneratePrefixedUUID("Products");
      const Product = await Products.create(ProductData);

      const res: Product = Product.toJSON() as Product;

      return res;
    } catch (error) {
      throw new ServerError("[createProduct][ProductsDBImpl]: " + error);
    }
  }

  /* ------------------------- GET PRODUCT DETAILS BY PID ------------------------- */
  async GetProductByPID(ctx: Context, productPID: string): Promise<Product> {
    try {
      const Product = await Products.findOne({ where: { PID: productPID } });
      const res = Product?.toJSON() as Product;

      return res;
    } catch (error) {
      throw new ServerError("[getProductByPID][ProductsDBImpl]: " + error);
    }
  }

  /* ------------------------- UPDATE PRODUCT ------------------------- */
  async UpdateProduct(ctx: any, updateProduct: Product): Promise<Number> {
    try {
      const { PID } = updateProduct;

      const [res] = await Products.update(updateProduct, {
        where: { PID: PID },
      });

      return res;
    } catch (error) {
      throw new ServerError("[updateProduct][ProductsDBImpl]: " + error);
    }
  }

  /* ------------------------- LIST PRODUCTS ------------------------- */
  async ListProductsByVendor(ctx: Context, vendorId: string): Promise<Product[]> {
    try {
      const products = await Products.findAll({
        where: {
          VendorID: vendorId
        }
      });

      const res = products.map((Product) => Product?.toJSON());
      return res;
    } catch (error) {
      throw new Error("Failed to list Products");
    }
  }
}

export { ProductsDBImpl };
