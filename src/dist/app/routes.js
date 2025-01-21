"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const middlewares_1 = require("./middlewares/middlewares");
const controller_1 = require("../controllers/v1/health/controller");
const controllers_1 = require("../controllers/v1/product/controllers");
// MIDDLEWARE OBJECT CREATE
const middleware = new middlewares_1.MiddlewareClass();
// CONTROLLER OBJECTS
const health = new controller_1.Health();
const router = new koa_router_1.default();
exports.router = router;
const product = new controllers_1.Product();
router.use(middleware.AddTraceID);
router.use(middleware.ReqResLogs);
// OK
router.get("/", health.OkRouting);
// PRODUCT
router.post("/v1/api/product", middleware.AddTraceID, product.CreateProduct);
router.get("/v1/api/product/:product_id", middleware.AddTraceID, product.GetProduct);
router.put("/v1/api/product/:product_id", middleware.AddTraceID, product.UpdateProduct);
router.get("/v1/api/product/vendor/:vendor_id", middleware.AddTraceID, product.ListProductsByVendor);
