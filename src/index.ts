import Koa, { Context, Next } from "koa";
import cors from "koa-cors";
import { router } from "./app/routes";
import { config } from "./config/config";
import bodyParser from "koa-bodyparser";
import { Database } from "./database/connection";

async function startServer() {
  // Initialize database connection with error handling
  try {
    Database.getInstance();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to database or redis:", error);
    process.exit(1); // Exit the process on failure
  }

  const app = new Koa();

  // Use koa-bodyparser middleware to parse JSON request bodies
  app.use(bodyParser());
  app.use(cors({ origin: "*" }));

  // Use the routes defined in routes.js
  app.use(router.routes());
  app.use(router.allowedMethods());

  // Start the server
  const PORT = config.app.port;

  const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 🚀`);
  });

  async function gracefulShutdown() {
    console.log("Received shutdown signal, shutting down gracefully... ⏳");
    server.close(async () => {
      try {
        //close  DB and Redis connection
        await Database.getInstance().closeSequilize();
        console.log("Database and Redis connections closed. ✅");
        process.exit(0);
      } catch (err) {
        console.error("Error during shutdown:", err);
        process.exit(1);
      }
    });

    setTimeout(() => {
      console.error("Forcing server shutdown... ");
      process.exit(1);
    }, 10000).unref();
  }

  process.on("SIGTERM", gracefulShutdown);
  process.on("SIGINT", gracefulShutdown);
}

startServer();
