"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadDatabaseConfig = loadDatabaseConfig;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function loadDatabaseConfig() {
    const { DB_HOST, DB_DATABASE, DB_USERNAME, DB_PASSWORD } = process.env;
    return {
        dbHost: DB_HOST || "",
        dbName: DB_DATABASE || "",
        dbUsername: DB_USERNAME || "",
        dbPassword: DB_PASSWORD || "",
    };
}
