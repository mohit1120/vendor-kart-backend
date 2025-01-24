import dotenv from "dotenv";

dotenv.config();

interface DatabaseConfig {
  dbHost: string;
  dbName: string;
  dbUsername: string;
  dbPassword: string;
}

function loadDatabaseConfig(): DatabaseConfig {
  const { DB_HOST, DB_DATABASE, DB_USERNAME, DB_PASSWORD } = process.env;
  return {
    dbHost: DB_HOST || "",
    dbName: DB_DATABASE || "",
    dbUsername: DB_USERNAME || "",
    dbPassword: DB_PASSWORD || "",
  };
}

export { DatabaseConfig, loadDatabaseConfig };
