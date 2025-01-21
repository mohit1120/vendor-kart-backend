"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductTransformer = CreateProductTransformer;
exports.GetProductTransformer = GetProductTransformer;
exports.UpadteProductTransformer = UpadteProductTransformer;
exports.ListProductsTransformer = ListProductsTransformer;
/* ------------------------ CREATE PRODUCT TRANSFORMER ------------------------ */
function CreateProductTransformer(data) {
    let res = {};
    var baseRes = {};
    res.product_id = data.product.PID;
    res.name = data.product.Name;
    res.description = data.product.Description;
    res.price = data.product.Price;
    res.qty = data.product.Qty;
    res.category_id = data.product.CategoryID;
    res.vendor_id = data.product.VendorID;
    res.created_at = data.product.CreatedAt;
    res.updated_at = data.product.UpdatedAt;
    baseRes.message = data.baseRes.message;
    baseRes.status_code = data.baseRes.status_code;
    baseRes.data = res;
    baseRes.success = data.baseRes.success;
    return baseRes;
}
/* ------------------------ GET PRODUCT TRANSFORMER ------------------------ */
function GetProductTransformer(data) {
    let res = {};
    var baseRes = {};
    res.product_id = data.product.PID;
    res.name = data.product.Name;
    res.description = data.product.Description;
    res.price = data.product.Price;
    res.qty = data.product.Qty;
    res.category_id = data.product.CategoryID;
    res.vendor_id = data.product.VendorID;
    res.created_at = data.product.CreatedAt;
    res.updated_at = data.product.UpdatedAt;
    baseRes.message = data.baseRes.message;
    baseRes.status_code = data.baseRes.status_code;
    baseRes.data = res;
    baseRes.success = data.baseRes.success;
    return baseRes;
}
/* ------------------------ UPDATE PRODUCT TRANSFORMER ------------------------ */
function UpadteProductTransformer(data) {
    let res = {};
    var baseRes = {};
    baseRes.message = data.baseRes.message;
    baseRes.status_code = data.baseRes.status_code;
    baseRes.data = res;
    baseRes.success = data.baseRes.success;
    return baseRes;
}
/* ------------------------ LIST PRODUCT TRANSFORMER ------------------------ */
function ListProductsTransformer(data) {
    let res = [];
    var baseRes = {};
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
