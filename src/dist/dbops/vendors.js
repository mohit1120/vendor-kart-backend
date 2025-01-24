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
exports.VendorsDBImpl = void 0;
const errors_1 = require("../errors/errors");
const vendors_1 = require("../entities/vendors");
/* -------------------------------------------------------------------------- */
/*                                    CLASS                                   */
/* -------------------------------------------------------------------------- */
class VendorsDBImpl {
    /* ------------------------- GET PRODUCT DETAILS BY PID ------------------------- */
    GetVendorByPID(ctx, vendorPID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Product = yield vendors_1.Vendors.findOne({ where: { PID: vendorPID } });
                const res = Product === null || Product === void 0 ? void 0 : Product.toJSON();
                return res;
            }
            catch (error) {
                throw new errors_1.ServerError("[GetVendorByPID][VendorsDBImpl]: " + error);
            }
        });
    }
}
exports.VendorsDBImpl = VendorsDBImpl;
