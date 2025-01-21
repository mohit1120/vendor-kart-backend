"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTraceID = GetTraceID;
const constants_1 = require("../constants/constants");
function GetTraceID(ctx) {
    const traceID = ctx.request.headers[constants_1.constants.headers.TraceID] || "";
    return traceID;
}
