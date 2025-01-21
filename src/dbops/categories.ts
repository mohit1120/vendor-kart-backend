import { utils } from "../utils/utils";
import { ServerError } from "../errors/errors";
import { Context } from "koa";
import { Product, Products } from "../entities/products";
import { Categories } from "../entities/categories";

/* -------------------------------------------------------------------------- */
/*                                  INTERFACE                                 */
/* -------------------------------------------------------------------------- */
interface Interface {
  GetCategoryByPID(ctx: Context, ProductPID: string): Promise<Product>;
}

/* -------------------------------------------------------------------------- */
/*                                    CLASS                                   */
/* -------------------------------------------------------------------------- */
class CategoriesDBImpl implements Interface {

  /* ------------------------- GET PRODUCT DETAILS BY PID ------------------------- */
  async GetCategoryByPID(ctx: Context, categoryPID: string): Promise<Product> {
    try {
      const Product = await Categories.findOne({ where: { PID:  categoryPID} });
      const res = Product?.toJSON() as Product;

      return res;
    } catch (error) {
      throw new ServerError("[GetCategoryByPID][CategoriesDBImpl]: " + error);
    }
  }
}

export { CategoriesDBImpl };
