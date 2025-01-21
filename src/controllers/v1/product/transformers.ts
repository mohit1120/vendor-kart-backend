import * as models from "../../../models/models";
import { CreateProductObj } from "../../../services/productsvc/create_product";
import { GetProductObj } from "../../../services/productsvc/get_product";
import { ListProductsObj } from "../../../services/productsvc/list_products_by_vendor";
import { UpdateProductObj } from "../../../services/productsvc/update_product";

/* ------------------------ CREATE PRODUCT TRANSFORMER ------------------------ */
function CreateProductTransformer(data: CreateProductObj): models.BaseRes {
  let res: models.CreateProductRes = {};
  var baseRes: models.BaseRes = {};

  res.product_id = data.product.PID;
  res.name = data.product.Name;
  res.description = data.product.Description;
  res.price = data.product.Price;
  res.qty = data.product.Qty;
  res.category_id = data.product.CategoryID;
  res.vendor_id = data.product.VendorID
  res.created_at = data.product.CreatedAt;
  res.updated_at = data.product.UpdatedAt

  baseRes.message = data.baseRes.message;
  baseRes.status_code = data.baseRes.status_code;
  baseRes.data = res;
  baseRes.success = data.baseRes.success;

  return baseRes;
}

/* ------------------------ GET PRODUCT TRANSFORMER ------------------------ */
function GetProductTransformer(data: GetProductObj): models.BaseRes {
  let res: models.GetProductRes = {};
  var baseRes: models.BaseRes = {};

  res.product_id = data.product.PID;
  res.name = data.product.Name;
  res.description = data.product.Description;
  res.price = data.product.Price;
  res.qty = data.product.Qty;
  res.category_id = data.product.CategoryID;
  res.vendor_id = data.product.VendorID
  res.created_at = data.product.CreatedAt;
  res.updated_at = data.product.UpdatedAt

  baseRes.message = data.baseRes.message;
  baseRes.status_code = data.baseRes.status_code;
  baseRes.data = res;
  baseRes.success = data.baseRes.success;

  return baseRes;
}

/* ------------------------ UPDATE PRODUCT TRANSFORMER ------------------------ */
function UpadteProductTransformer(data: UpdateProductObj): models.BaseRes {
  let res: models.UpdateProductRes = {};
  var baseRes: models.BaseRes = {};

  baseRes.message = data.baseRes.message;
  baseRes.status_code = data.baseRes.status_code;
  baseRes.data = res;
  baseRes.success = data.baseRes.success;

  return baseRes;
}

/* ------------------------ LIST PRODUCT TRANSFORMER ------------------------ */
function ListProductsTransformer(data: ListProductsObj): models.BaseRes {
  let res: models.GetProductRes[] = [];
  var baseRes: models.BaseRes = {};

  res = data.products.map((item) => {
    return {
      product_id: item.PID,
      name: item.Name,
      description: item.Description,
      price: item.Price,
      qty: item.Qty,
      category_id: item.CategoryID,
      vendor_id: item.VendorID,
      created_at: item.CreatedAt,
      updated_at: item.UpdatedAt
    };
  });

  baseRes.message = data.baseRes.message;
  baseRes.status_code = data.baseRes.status_code;
  baseRes.data = res;
  baseRes.success = data.baseRes.success;

  return baseRes;
}

export { CreateProductTransformer, GetProductTransformer, UpadteProductTransformer, ListProductsTransformer};
