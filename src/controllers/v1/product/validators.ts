import { Context } from "koa";
import * as models from "../../../models/models";
import { ValidationError } from "../../../errors/errors";
import { VendorsDBImpl } from "../../../dbops/vendors";
import { ProductsDBImpl } from "../../../dbops/products";
import { CategoriesDBImpl } from "../../../dbops/categories";


/* ------------------------- CREATE PRODUCT VALIDATOR ------------------------ */
async function ValidateCreateProduct(ctx: Context): Promise<models.CreateProductReq> {
  try {
    // Parse JSON
    const productReq = ctx.request.body as models.CreateProductReq;

    // set default values
    const reqBody: models.CreateProductReq = {
      name: productReq.name || "",
      description: productReq.description || "",
      price: productReq.price || 0,
      qty: productReq.qty || 0,
      category_id: productReq.category_id || "categories_1989a988-0000-68g3-997c-98c9c244e004",    // for now hard coding the others category pid
      vendor_id: productReq.vendor_id || ""
    };

    // validate name
    validateName(ctx, reqBody.name);

    // validate description
    validateDesciption(ctx, reqBody.description);

    //validae price
    validatePrice(ctx, reqBody.price);

    // validate quantity
    validateQuantity(ctx, reqBody.qty);

    // validate category
    await validateCategory(ctx, reqBody.category_id);

    // validate vendor 
    await validateVendor(ctx, reqBody.vendor_id);

    return reqBody;
  } catch (error: any) {
    throw new ValidationError(error.message);
  }
}

/* ------------------------- GET PRODUCT VALIDATOR ------------------------ */
async function ValidateGetProduct(ctx: Context): Promise<models.GetProductReq> {
  try {
    // Parse JSON
    const orgReq = ctx.params as models.GetProductReq;

    // set default values
    const reqParams: models.GetProductReq = {
      product_id: orgReq.product_id || "",
    };

    // validate product id
    validateProductPID(ctx, reqParams.product_id);

    // check product exists or not
    await validateProductReqParams(ctx, reqParams.product_id);

    return orgReq;
  } catch (error: any) {
    throw new ValidationError(error.message);
  }
}

/* ------------------------- UPDATE PRODUCT VALIDATOR ------------------------ */
async function ValidateUpdateProduct(ctx: Context): Promise<models.UpdateProductReq> {
  try {
    // Parse JSON
    const { product_id } = ctx.params as models.UpdateProductReq;
    const { description, price, qty } = ctx.request.body as models.UpdateProductReq;

    // set default values
    const reqBody: models.UpdateProductReq = {
      product_id: product_id || "",
      description: description || "",
      price: price || 0,
      qty: qty || 0,
    };

    // validate product id
    validateProductPID(ctx, reqBody.product_id)

    // check product exists or not 
    await validateProductReqParams(ctx, reqBody.product_id)

    return reqBody;
  } catch (error: any) {
    throw new ValidationError(error.message);
  }
}

/* ------------------------- UPDATE PRODUCT VALIDATOR ------------------------ */
async function ValidateListProduct(ctx: Context): Promise<models.ListProducts> {
  try {
    // Parse JSON
    const { vendor_id } = ctx.params as models.ListProducts;

    // set default values
    const reqBody: models.ListProducts = {
     vendor_id: vendor_id || ""
    };

    // check vendor exists or not
    await validateVendor(ctx, reqBody.vendor_id)

    return reqBody;
  } catch (error: any) {
    throw new ValidationError(error.message);
  }
}


function validateName(ctx: Context, name: string) {
  if (name == "") {
    throw new ValidationError("product_name field is required");
  }
  if (name.length < 1 || name.length > 200) {
    throw new ValidationError("product_name range must be between 1 to 250 char");
  }
}

function validateDesciption(ctx: Context, description: string) {
  if (description == "") {
    throw new ValidationError("product_desc field is required");
  }
  if (description.length < 1 || description.length > 100) {
    throw new ValidationError("product_desc range must be between 1 to 600 char");
  }
}

function validatePrice(ctx: Context, price: number) {
  if (price) {
    throw new ValidationError("product_price field is required");
  }

  if (price < 1 || price > 1000000) {
    throw new ValidationError("product_price range must be between 1 to 1000000");
  }
}

function validateQuantity(ctx: Context, qty: number) {
  if (qty) {
    throw new ValidationError("product_qty field is required");
  }

  if (qty < 1 || qty > 10000) {
    throw new ValidationError("product_qty range must be between 1 to 10000");
  }
}

async function validateCategory(ctx: Context, categoryId: string) {
  if (categoryId) {
    throw new ValidationError("category field is required");
  }

  // make a db call to check category exists or not
  const categoryDB = new CategoriesDBImpl();
  const category = await categoryDB.GetCategoryByPID(ctx, categoryId)

  if(!category){
    throw new ValidationError("invalid category_id")
  }
}

async function validateVendor(ctx: Context, VendorId: string) {
  if (!VendorId) {
    throw new ValidationError("vendor_id field is required");
  }

  // make a db to check vendor exists or not
  const vendorDB = new VendorsDBImpl();
  const vendor = await vendorDB.GetVendorByPID(ctx, VendorId)

  if(!vendor){
    throw new ValidationError("invalid vendor_id")
  }
}

function validateProductPID(ctx: Context, productID: string) {
  if (productID == "") {
    throw new ValidationError("product_id field is required");
  }
}

async function validateProductReqParams(ctx: Context, productID: string) {
  // make a db to check product exists or not
  const productDB = new ProductsDBImpl();
  const product = await productDB.GetProductByPID(ctx, productID)

  if(!product){
    throw new ValidationError("invalid product_id")
  }
}

export { ValidateCreateProduct, ValidateGetProduct, ValidateUpdateProduct, ValidateListProduct };
