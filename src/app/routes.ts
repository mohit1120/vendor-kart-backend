import Router from "koa-router";
import { MiddlewareClass } from "./middlewares/middlewares";
import { Health } from "../controllers/v1/health/controller";
import { Product } from "../controllers/v1/product/controllers";

// MIDDLEWARE OBJECT CREATE
const middleware = new MiddlewareClass();

// CONTROLLER OBJECTS
const health = new Health();
const router = new Router();
const product = new Product();

router.use(middleware.AddTraceID);
router.use(middleware.ReqResLogs);

// OK
router.get("/", health.OkRouting);

// PRODUCT
router.post("/v1/api/product", middleware.AddTraceID, product.CreateProduct)
router.get("/v1/api/product/:product_id", middleware.AddTraceID, product.GetProduct);
router.put("/v1/api/product/:product_id", middleware.AddTraceID, product.UpdateProduct)
router.get("/v1/api/product/vendor/:vendor_id", middleware.AddTraceID, product.ListProductsByVendor)

// Export the router
export { router };
