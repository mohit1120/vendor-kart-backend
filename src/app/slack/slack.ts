import { Block, WebClient } from "@slack/web-api";
import { utils } from "../../utils/utils";
import { contextBlock, dividerBlock, headerBlock } from "./blocks";
import { config } from "../../config/config";
import * as models from "../../models/models";

const slackToken = config.slack.slackToken;
const channelID = config.slack.slackChannelID;

// Create a new instance of WebClient
const slackClient = new WebClient(slackToken);

function createErrorAlertMessage(req: models.SlackRequest) {
  const { StatusCode, Ctx, ErrorType, Message } = req;
  const TraceID = utils.GetTraceID(req.Ctx);
  const Endpoint = Ctx.request.originalUrl;
  const Env = config.app.env || "";
  const BuildNo = process.env.JENKINS_BUILD_NUMBER || "";
  const header = Env === "production" ? "ERROR ALERT :alert: :alert:" : "ERROR ALERT :courage-warning: :fixme: :fixme:";
  const blocks = [headerBlock(header), dividerBlock(), headerBlock("Details"), contextBlock("Service", "RC DASHBOARD CORE"), contextBlock("Error Type", ErrorType), contextBlock("Status Code", StatusCode.toString()), contextBlock("Message", Message), contextBlock("Trace ID", TraceID), contextBlock("Endpoint", Endpoint), headerBlock("Deployment"), contextBlock("Environment", Env), contextBlock("Build Number", BuildNo)];
  return blocks;
}
/* -------------------------------------------------------------------------- */
/*                              Notify Function                               */
/* -------------------------------------------------------------------------- */
async function Notify(req: models.SlackRequest): Promise<boolean> {
  if (!config.slack.slackNotificationEnabled || config.slack.slackNotificationEnabled !== "1") {
    return false;
  }
  try {
    const blocks = createErrorAlertMessage(req);
    const result = await slackClient.chat.postMessage({
      channel: channelID,
      blocks: blocks,
    });
    console.log("Message sent to Slack:");
    return true;
  } catch (error) {
    console.error("Error sending message to Slack:", error);
    return false;
  }
}
export { Notify };
