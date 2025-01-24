"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constants = void 0;
const errors_1 = require("./errors");
const headers_1 = require("./headers");
const status_codes_1 = require("./status_codes");
const prefix_1 = require("./prefix");
const constants = {
    headers: headers_1.headers,
    errorType: errors_1.errorType,
    http: status_codes_1.http,
    Prefix: prefix_1.Prefix,
};
exports.constants = constants;
