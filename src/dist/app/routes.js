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
const controllers_2 = require("../controllers/v1/order/controllers");
const controllers_3 = require("../controllers/v1/shipment/controllers");
const controllers_4 = require("../controllers/v1/cart/controllers");
// MIDDLEWARE OBJECT CREATE
const middleware = new middlewares_1.MiddlewareClass();
// CONTROLLER OBJECTS
const health = new controller_1.Health();
const router = new koa_router_1.default();
exports.router = router;
const product = new controllers_1.Product();
const order = new controllers_2.Order();
const shipment = new controllers_3.Shipment();
const cart = new controllers_4.Cart();
router.use(middleware.AddTraceID);
router.use(middleware.ReqResLogs);
// OK
router.get("/api/v1", health.OkRouting);
// PRODUCT
router.post("/api/v1/product", middleware.AddTraceID, product.CreateProduct);
router.get("/api/v1/product/:product_id", middleware.AddTraceID, product.GetProduct);
router.put("/api/v1/product/:product_id", middleware.AddTraceID, product.UpdateProduct);
router.get("/api/v1/product/vendor/:vendor_id", middleware.AddTraceID, product.ListProductsByVendor);
// CART
router.post("/api/v1/cart", middleware.AddTraceID, cart.Createcart);
// ORDER
router.post("/api/v1/order", middleware.AddTraceID, order.CreateOrder);
router.get("/api/v1/order/:order_id", middleware.AddTraceID, order.GetOrder);
//shipment
router.get("/api/v1/shipment/:tracking_no", middleware.AddTraceID, shipment.GetShipment);
