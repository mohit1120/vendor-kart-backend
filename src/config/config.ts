import { loadAppConfig, AppConfig } from "./app";
import { loadDatabaseConfig, DatabaseConfig } from "./database";
import { loadSlackConfig, SlackConfig } from "./slack";

// Load app and database configurations
const appConfig: AppConfig = loadAppConfig();
const databaseConfig: DatabaseConfig = loadDatabaseConfig();
const slackConfig: SlackConfig = loadSlackConfig();

// Create and export the Config interface
interface Config {
  app: AppConfig;
  database: DatabaseConfig;
  slack: SlackConfig;
}

const config: Config = {
  app: appConfig,
  database: databaseConfig,
  slack: slackConfig,
};

export { config };
