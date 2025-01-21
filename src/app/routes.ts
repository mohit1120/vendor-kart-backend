import Router from "koa-router";
import { MiddlewareClass } from "./middlewares/middlewares";
import { Health } from "../controllers/v1/health/controller";

// MIDDLEWARE OBJECT CREATE
const middleware = new MiddlewareClass();

// CONTROLLER OBJECTS
const health = new Health();
const router = new Router();

router.use(middleware.AddTraceID);
router.use(middleware.ReqResLogs);

router.get("/", health.OkRouting);
// Export the router
export { router };
