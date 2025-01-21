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
exports.Product = void 0;
const handle_errors_1 = require("../../../errors/handle_errors");
const utils_1 = require("../../../utils/utils");
const validators_1 = require("./validators");
const interface_1 = require("../../../services/productsvc/interface");
const transformers_1 = require("./transformers");
/* -------------------------------------------------------------------------- */
/*                                    Class                                   */
/* -------------------------------------------------------------------------- */
class Product {
    /* ------------------------- CREATE PRODUCT CONTROLLER ------------------------ */
    CreateProduct(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validate request
                const validatedReq = yield (0, validators_1.ValidateCreateProduct)(ctx);
                // Call your service function
                let productSvc = new interface_1.ProductSvc();
                const createProductRes = yield productSvc.CreateProduct(ctx, validatedReq);
                // Transform response
                const finalRes = (0, transformers_1.CreateProductTransformer)(createProductRes);
                // Return response
                yield utils_1.utils.JsonResponse(ctx, finalRes);
            }
            catch (error) {
                // handle all errors
                (0, handle_errors_1.HandleErrors)(ctx, error);
            }
        });
    }
    /* ------------------------- GET PRODUCT CONTROLLER ------------------------ */
    GetProduct(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validate request
                const validatedReq = yield (0, validators_1.ValidateGetProduct)(ctx);
                // Call your service function
                let productSvc = new interface_1.ProductSvc();
                const getProductRes = yield productSvc.GetProduct(ctx, validatedReq);
                // Transform response
                const finalRes = (0, transformers_1.GetProductTransformer)(getProductRes);
                // Return response
                yield utils_1.utils.JsonResponse(ctx, finalRes);
            }
            catch (error) {
                // handle all errors
                (0, handle_errors_1.HandleErrors)(ctx, error);
            }
        });
    }
    /* ------------------------- UPDATE PRODUCT CONTROLLER ------------------------ */
    UpdateProduct(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validate request
                const validatedReq = yield (0, validators_1.ValidateUpdateProduct)(ctx);
                // call your service function
                let productSvc = new interface_1.ProductSvc();
                let updateProductRes = yield productSvc.UpdateProduct(ctx, validatedReq);
                // Transform response
                const finalRes = (0, transformers_1.UpadteProductTransformer)(updateProductRes);
                // Return response
                yield utils_1.utils.JsonResponse(ctx, finalRes);
            }
            catch (error) {
                // handle all errors
                (0, handle_errors_1.HandleErrors)(ctx, error);
            }
        });
    }
    /* ------------------------- LIST PRODUCT CONTROLLER ------------------------ */
    ListProductsByVendor(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validate request
                const validatedReq = yield (0, validators_1.ValidateListProduct)(ctx);
                // call your service function
                let productSvc = new interface_1.ProductSvc();
                let listProductRes = yield productSvc.ListProductsByvendor(ctx, validatedReq);
                // Transform response
                const finalRes = (0, transformers_1.ListProductsTransformer)(listProductRes);
                // Return response
                yield utils_1.utils.JsonResponse(ctx, finalRes);
            }
            catch (error) {
                // handle all errors
                (0, handle_errors_1.HandleErrors)(ctx, error);
            }
        });
    }
}
exports.Product = Product;
