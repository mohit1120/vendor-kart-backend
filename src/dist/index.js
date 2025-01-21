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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_cors_1 = __importDefault(require("koa-cors"));
const routes_1 = require("./app/routes");
const config_1 = require("./config/config");
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const connection_1 = require("./database/connection");
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        // Initialize database connection with error handling
        try {
            connection_1.Database.getInstance();
            console.log("Database connected successfully");
        }
        catch (error) {
            console.error("Error connecting to database or redis:", error);
            process.exit(1); // Exit the process on failure
        }
        const app = new koa_1.default();
        // Use koa-bodyparser middleware to parse JSON request bodies
        app.use((0, koa_bodyparser_1.default)());
        app.use((0, koa_cors_1.default)({ origin: "*" }));
        // Use the routes defined in routes.js
        app.use(routes_1.router.routes());
        app.use(routes_1.router.allowedMethods());
        // Start the server
        const PORT = config_1.config.app.port;
        const server = app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT} 🚀`);
        });
        function gracefulShutdown() {
            return __awaiter(this, void 0, void 0, function* () {
                console.log("Received shutdown signal, shutting down gracefully... ⏳");
                server.close(() => __awaiter(this, void 0, void 0, function* () {
                    try {
                        //close  DB and Redis connection
                        yield connection_1.Database.getInstance().closeSequilize();
                        console.log("Database and Redis connections closed. ✅");
                        process.exit(0);
                    }
                    catch (err) {
                        console.error("Error during shutdown:", err);
                        process.exit(1);
                    }
                }));
                setTimeout(() => {
                    console.error("Forcing server shutdown... ");
                    process.exit(1);
                }, 10000).unref();
            });
        }
        process.on("SIGTERM", gracefulShutdown);
        process.on("SIGINT", gracefulShutdown);
    });
}
startServer();
