"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadAppConfig = loadAppConfig;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function loadAppConfig() {
    const { APP_PORT, APP_ENV, APP_URL } = process.env;
    return {
        port: APP_PORT || '',
        env: APP_ENV || ''
    };
}
