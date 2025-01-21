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
exports.Notify = Notify;
const web_api_1 = require("@slack/web-api");
const utils_1 = require("../../utils/utils");
const blocks_1 = require("./blocks");
const config_1 = require("../../config/config");
const slackToken = config_1.config.slack.slackToken;
const channelID = config_1.config.slack.slackChannelID;
// Create a new instance of WebClient
const slackClient = new web_api_1.WebClient(slackToken);
function createErrorAlertMessage(req) {
    const { StatusCode, Ctx, ErrorType, Message } = req;
    const TraceID = utils_1.utils.GetTraceID(req.Ctx);
    const Endpoint = Ctx.request.originalUrl;
    const Env = config_1.config.app.env || "";
    const BuildNo = process.env.JENKINS_BUILD_NUMBER || "";
    const header = Env === "production" ? "ERROR ALERT :alert: :alert:" : "ERROR ALERT :courage-warning: :fixme: :fixme:";
    const blocks = [(0, blocks_1.headerBlock)(header), (0, blocks_1.dividerBlock)(), (0, blocks_1.headerBlock)("Details"), (0, blocks_1.contextBlock)("Service", "RC DASHBOARD CORE"), (0, blocks_1.contextBlock)("Error Type", ErrorType), (0, blocks_1.contextBlock)("Status Code", StatusCode.toString()), (0, blocks_1.contextBlock)("Message", Message), (0, blocks_1.contextBlock)("Trace ID", TraceID), (0, blocks_1.contextBlock)("Endpoint", Endpoint), (0, blocks_1.headerBlock)("Deployment"), (0, blocks_1.contextBlock)("Environment", Env), (0, blocks_1.contextBlock)("Build Number", BuildNo)];
    return blocks;
}
/* -------------------------------------------------------------------------- */
/*                              Notify Function                               */
/* -------------------------------------------------------------------------- */
function Notify(req) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!config_1.config.slack.slackNotificationEnabled || config_1.config.slack.slackNotificationEnabled !== "1") {
            return false;
        }
        try {
            const blocks = createErrorAlertMessage(req);
            const result = yield slackClient.chat.postMessage({
                channel: channelID,
                blocks: blocks,
            });
            console.log("Message sent to Slack:");
            return true;
        }
        catch (error) {
            console.error("Error sending message to Slack:", error);
            return false;
        }
    });
}
