"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSlackConfig = loadSlackConfig;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function loadSlackConfig() {
    const { SLACK_TOKEN, SLACK_CHANNEL_ID, SLACK_NOTIFICATION_ENABLED } = process.env;
    return {
        slackToken: SLACK_TOKEN || "",
        slackChannelID: SLACK_CHANNEL_ID || "",
        slackNotificationEnabled: SLACK_NOTIFICATION_ENABLED || "",
    };
}
