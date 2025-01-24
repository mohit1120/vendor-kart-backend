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
exports.ProductsDBImpl = void 0;
const utils_1 = require("../utils/utils");
const errors_1 = require("../errors/errors");
const products_1 = require("../entities/products");
/* -------------------------------------------------------------------------- */
/*                                    CLASS                                   */
/* -------------------------------------------------------------------------- */
class ProductsDBImpl {
    /* ------------------------------- CREATE PRODUCT ------------------------------- */
    CreateProduct(ctx, ProductData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                ProductData.PID = utils_1.utils.GeneratePrefixedUUID("product");
                const Product = yield products_1.Products.create(ProductData);
                const res = Product.toJSON();
                return res;
            }
            catch (error) {
                throw new errors_1.ServerError("[createProduct][ProductsDBImpl]: " + error);
            }
        });
    }
    /* ------------------------- GET PRODUCT DETAILS BY PID ------------------------- */
    GetProductByPID(ctx, productPID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Product = yield products_1.Products.findOne({ where: { PID: productPID } });
                const res = Product === null || Product === void 0 ? void 0 : Product.toJSON();
                return res;
            }
            catch (error) {
                throw new errors_1.ServerError("[getProductByPID][ProductsDBImpl]: " + error);
            }
        });
    }
    /* ------------------------- UPDATE PRODUCT ------------------------- */
    UpdateProduct(ctx, updateProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { PID } = updateProduct;
                const [res] = yield products_1.Products.update(updateProduct, {
                    where: { PID: PID },
                });
                return res;
            }
            catch (error) {
                throw new errors_1.ServerError("[updateProduct][ProductsDBImpl]: " + error);
            }
        });
    }
    /* ------------------------- LIST PRODUCTS ------------------------- */
    ListProductsByVendor(ctx, vendorId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield products_1.Products.findAll({
                    where: {
                        VendorID: vendorId
                    }
                });
                const res = products.map((Product) => Product === null || Product === void 0 ? void 0 : Product.toJSON());
                return res;
            }
            catch (error) {
                throw new Error("Failed to list Products");
            }
        });
    }
}
exports.ProductsDBImpl = ProductsDBImpl;
