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
exports.ListProductsByvendor = ListProductsByvendor;
const errors_1 = require("../../errors/errors");
const status_codes_1 = require("../../constants/status_codes");
const products_1 = require("../../dbops/products");
function ListProductsByvendor(ctx, reqBody) {
    return __awaiter(this, void 0, void 0, function* () {
        let products = [];
        let res = {
            baseRes: {},
            products: [],
        };
        // initialize
        res.baseRes.success = false;
        res.baseRes.status_code = status_codes_1.http.StatusInternalServerError;
        res.baseRes.message = "faliure";
        try {
            let productDB = new products_1.ProductsDBImpl();
            products = yield productDB.ListProductsByVendor(ctx, reqBody.vendor_id);
            // assign values
            res.products = products;
            res.baseRes.success = true;
            res.baseRes.status_code = status_codes_1.http.StatusOK;
            res.baseRes.message = "";
            return res;
        }
        catch (error) {
            throw new errors_1.ServerError("[ListProductsByvendor][ProductsSvc]: " + error);
        }
    });
}
