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
exports.ProductSvc = void 0;
const create_product_1 = require("./create_product");
const get_product_1 = require("./get_product");
const update_product_1 = require("./update_product");
const list_products_by_vendor_1 = require("./list_products_by_vendor");
/* -------------------------------------------------------------------------- */
/*                                    class                                   */
/* -------------------------------------------------------------------------- */
class ProductSvc {
    CreateProduct(ctx, reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, create_product_1.CreateProduct)(ctx, reqBody);
        });
    }
    GetProduct(ctx, reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, get_product_1.GetProduct)(ctx, reqBody);
        });
    }
    UpdateProduct(ctx, reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, update_product_1.UpdateProduct)(ctx, reqBody);
        });
    }
    ListProductsByvendor(ctx, reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, list_products_by_vendor_1.ListProductsByvendor)(ctx, reqBody);
        });
    }
}
exports.ProductSvc = ProductSvc;
