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
exports.MiddlewareClass = void 0;
const utils_1 = require("../../utils/utils");
const constants_1 = require("../../constants/constants");
const request_response_logs_1 = require("../../dbops/request_response_logs");
/* -------------------------------------------------------------------------- */
/*                              MIDDLEWARE CLASS                              */
/* -------------------------------------------------------------------------- */
class MiddlewareClass {
    /* ------------------------------ ADD TRACE ID ------------------------------ */
    AddTraceID(ctx, next) {
        let traceID = ctx.request.headers[constants_1.constants.headers.TraceID];
        if (!traceID || traceID === "") {
            const uuid = utils_1.utils.GeneratePrefixedUUID("");
            traceID = uuid;
        }
        // ctx.set(constants.headers.TraceID, traceID);
        ctx.request.header[constants_1.constants.headers.TraceID] = traceID;
        ctx.res.setHeader(constants_1.constants.headers.TraceID, traceID);
        console.log("in trace id", traceID);
        return next();
    }
    /* -------------------- REQUEST RESPONSE LOGS MIDDLEWARE -------------------- */
    ReqResLogs(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let log = {};
                // map data
                log.LogType = "Request"; // or 'Response' based on when this middleware is called
                log.Method = ctx.request.method;
                log.RequestBodyLength = ctx.request.length;
                log.RequestBody = ctx.body || "";
                log.EndPoint = ctx.request.originalUrl;
                log.HostURL = ctx.request.get("host");
                log.ClientIP = ctx.request.ip;
                log.RemoteIP = ctx.request.ip; // Assuming remote IP is the same as client IP in Koa
                log.Params = JSON.stringify(ctx.params);
                log.QueryParam = JSON.stringify(ctx.query);
                log.ContentType = ctx.request.get("Content-Type") || "";
                log.IsSandbox = ctx.request.headers["is-sandbox"] === "true";
                log.TraceID = ctx.request.headers[constants_1.constants.headers.TraceID];
                // Make entry in database after getting response
                yield next();
                log.ResponseBody = ctx.body || "";
                log.ResponseBodyLength = ctx.length;
                log.ResponseCode = ctx.response.status;
                const logDB = new request_response_logs_1.LogsDBImpl();
                yield logDB.CreateLog(ctx, log);
            }
            catch (error) {
                console.log(error);
                // HandleErrors(ctx, error);
            }
        });
    }
}
exports.MiddlewareClass = MiddlewareClass;
