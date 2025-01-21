"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const middlewares_1 = require("./middlewares/middlewares");
const controller_1 = require("../controllers/v1/health/controller");
// MIDDLEWARE OBJECT CREATE
const middleware = new middlewares_1.MiddlewareClass();
// CONTROLLER OBJECTS
const health = new controller_1.Health();
const router = new koa_router_1.default();
exports.router = router;
router.use(middleware.AddTraceID);
router.use(middleware.ReqResLogs);
router.get("/", health.OkRouting);
