"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateCreateProduct = ValidateCreateProduct;
exports.ValidateGetProduct = ValidateGetProduct;
exports.ValidateUpdateProduct = ValidateUpdateProduct;
exports.ValidateListProduct = ValidateListProduct;
const errors_1 = require("../../../errors/errors");
const vendors_1 = require("../../../dbops/vendors");
const products_1 = require("../../../dbops/products");
const categories_1 = require("../../../dbops/categories");
/* ------------------------- CREATE PRODUCT VALIDATOR ------------------------ */
function ValidateCreateProduct(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Parse JSON
            const productReq = ctx.request.body;
            // set default values
            const reqBody = {
                name: productReq.name || "",
                description: productReq.description || "",
                price: productReq.price || 0,
                qty: productReq.qty || 0,
                category_id: productReq.category_id || "categories_1989a988-0000-68g3-997c-98c9c244e004", // for now hard coding the others category pid
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
            yield validateCategory(ctx, reqBody.category_id);
            // validate vendor 
            yield validateVendor(ctx, reqBody.vendor_id);
            return reqBody;
        }
        catch (error) {
            throw new errors_1.ValidationError(error.message);
        }
    });
}
/* ------------------------- GET PRODUCT VALIDATOR ------------------------ */
function ValidateGetProduct(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Parse JSON
            const orgReq = ctx.params;
            // set default values
            const reqParams = {
                product_id: orgReq.product_id || "",
            };
            // validate product id
            validateProductPID(ctx, reqParams.product_id);
            // check product exists or not
            yield validateProductReqParams(ctx, reqParams.product_id);
            return orgReq;
        }
        catch (error) {
            throw new errors_1.ValidationError(error.message);
        }
    });
}
/* ------------------------- UPDATE PRODUCT VALIDATOR ------------------------ */
function ValidateUpdateProduct(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Parse JSON
            const { product_id } = ctx.params;
            const { description, price, qty } = ctx.request.body;
            // set default values
            const reqBody = {
                product_id: product_id || "",
                description: description || "",
                price: price || 0,
                qty: qty || 0,
            };
            // validate product id
            validateProductPID(ctx, reqBody.product_id);
            // check product exists or not 
            yield validateProductReqParams(ctx, reqBody.product_id);
            return reqBody;
        }
        catch (error) {
            throw new errors_1.ValidationError(error.message);
        }
    });
}
/* ------------------------- UPDATE PRODUCT VALIDATOR ------------------------ */
function ValidateListProduct(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Parse JSON
            const { vendor_id } = ctx.params;
            // set default values
            const reqBody = {
                vendor_id: vendor_id || ""
            };
            // check vendor exists or not
            yield validateVendor(ctx, reqBody.vendor_id);
            return reqBody;
        }
        catch (error) {
            throw new errors_1.ValidationError(error.message);
        }
    });
}
function validateName(ctx, name) {
    if (name == "") {
        throw new errors_1.ValidationError("product_name field is required");
    }
    if (name.length < 1 || name.length > 200) {
        throw new errors_1.ValidationError("product_name range must be between 1 to 250 char");
    }
}
function validateDesciption(ctx, description) {
    if (description == "") {
        throw new errors_1.ValidationError("product_desc field is required");
    }
    if (description.length < 1 || description.length > 100) {
        throw new errors_1.ValidationError("product_desc range must be between 1 to 600 char");
    }
}
function validatePrice(ctx, price) {
    if (price) {
        throw new errors_1.ValidationError("product_price field is required");
    }
    if (price < 1 || price > 1000000) {
        throw new errors_1.ValidationError("product_price range must be between 1 to 1000000");
    }
}
function validateQuantity(ctx, qty) {
    if (qty) {
        throw new errors_1.ValidationError("product_qty field is required");
    }
    if (qty < 1 || qty > 10000) {
        throw new errors_1.ValidationError("product_qty range must be between 1 to 10000");
    }
}
function validateCategory(ctx, categoryId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (categoryId) {
            throw new errors_1.ValidationError("category field is required");
        }
        // make a db call to check category exists or not
        const categoryDB = new categories_1.CategoriesDBImpl();
        const category = yield categoryDB.GetCategoryByPID(ctx, categoryId);
        if (!category) {
            throw new errors_1.ValidationError("invalid category_id");
        }
    });
}
function validateVendor(ctx, VendorId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!VendorId) {
            throw new errors_1.ValidationError("vendor_id field is required");
        }
        // make a db to check vendor exists or not
        const vendorDB = new vendors_1.VendorsDBImpl();
        const vendor = yield vendorDB.GetVendorByPID(ctx, VendorId);
        if (!vendor) {
            throw new errors_1.ValidationError("invalid vendor_id");
        }
    });
}
function validateProductPID(ctx, productID) {
    if (productID == "") {
        throw new errors_1.ValidationError("product_id field is required");
    }
}
function validateProductReqParams(ctx, productID) {
    return __awaiter(this, void 0, void 0, function* () {
        // make a db to check product exists or not
        const productDB = new products_1.ProductsDBImpl();
        const product = yield productDB.GetProductByPID(ctx, productID);
        if (!product) {
            throw new errors_1.ValidationError("invalid product_id");
        }
    });
}
