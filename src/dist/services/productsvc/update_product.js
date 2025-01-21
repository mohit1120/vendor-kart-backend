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
exports.UpdateProduct = UpdateProduct;
const status_codes_1 = require("../../constants/status_codes");
const products_1 = require("../../dbops/products");
const errors_1 = require("../../errors/errors");
function UpdateProduct(ctx, reqBody) {
    return __awaiter(this, void 0, void 0, function* () {
        let product = {};
        let res = {
            baseRes: {},
            product: {},
        };
        // initialize
        res.baseRes.success = false;
        res.baseRes.status_code = status_codes_1.http.StatusInternalServerError;
        res.baseRes.message = "faliure";
        try {
            // map data
            if (reqBody.product_id) {
                product.PID = reqBody.product_id;
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
            let productDB = new products_1.ProductsDBImpl();
            yield productDB.UpdateProduct(ctx, product);
            // get updated product
            if (product.PID) {
                product = yield productDB.GetProductByPID(ctx, product.PID);
            }
            // assign values
            res.product = product;
            res.baseRes.success = true;
            res.baseRes.status_code = status_codes_1.http.StatusOK;
            res.baseRes.message = "product updated sucessfully";
            return res;
        }
        catch (error) {
            throw new errors_1.ServerError("[updateProduct][ProductSvc]: " + error);
        }
    });
}
