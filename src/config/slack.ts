import dotenv from "dotenv";

dotenv.config();

interface SlackConfig {
  slackToken: string;
  slackChannelID: string;
  slackNotificationEnabled: string;
}

function loadSlackConfig(): SlackConfig {
  const { SLACK_TOKEN, SLACK_CHANNEL_ID, SLACK_NOTIFICATION_ENABLED } = process.env;
  return {
    slackToken: SLACK_TOKEN || "",
    slackChannelID: SLACK_CHANNEL_ID || "",
    slackNotificationEnabled: SLACK_NOTIFICATION_ENABLED || "",
  };
}
export { SlackConfig, loadSlackConfig };
