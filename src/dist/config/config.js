"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const app_1 = require("./app");
const database_1 = require("./database");
const slack_1 = require("./slack");
// Load app and database configurations
const appConfig = (0, app_1.loadAppConfig)();
const databaseConfig = (0, database_1.loadDatabaseConfig)();
const slackConfig = (0, slack_1.loadSlackConfig)();
const config = {
    app: appConfig,
    database: databaseConfig,
    slack: slackConfig,
};
exports.config = config;
