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
exports.utils = void 0;
const uuid_1 = require("./uuid");
const trace_id_1 = require("./trace_id");
const response_1 = require("./response");
/* ------------------------------- Util Class ------------------------------- */
class UtilClass {
    GeneratePrefixedUUID(prefix) {
        return (0, uuid_1.GeneratePrefixedUUID)(prefix);
    }
    GetTraceID(ctx) {
        return (0, trace_id_1.GetTraceID)(ctx);
    }
    JsonResponse(ctx, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, response_1.JsonResponse)(ctx, response);
        });
    }
}
/* --------------------------------- Export --------------------------------- */
const utils = new UtilClass();
exports.utils = utils;
