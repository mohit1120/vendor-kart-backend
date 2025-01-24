import Router from "koa-router";
import { MiddlewareClass } from "./middlewares/middlewares";
import { Health } from "../controllers/v1/health/controller";
import { Product } from "../controllers/v1/product/controllers";
import { Order } from "../controllers/v1/order/controllers";
import { Shipment } from "../controllers/v1/shipment/controllers";
import { Cart } from "../controllers/v1/cart/controllers";

// MIDDLEWARE OBJECT CREATE
const middleware = new MiddlewareClass();

// CONTROLLER OBJECTS
const health = new Health();
const router = new Router();
const product = new Product();
const order = new Order();
const shipment = new Shipment()
const cart = new Cart()

router.use(middleware.AddTraceID);
router.use(middleware.ReqResLogs);

// OK
router.get("/api/v1", health.OkRouting);

// PRODUCT
router.post("/api/v1/product", middleware.AddTraceID, product.CreateProduct)
router.get("/api/v1/product/:product_id", middleware.AddTraceID, product.GetProduct);
router.put("/api/v1/product/:product_id", middleware.AddTraceID, product.UpdateProduct)
router.get("/api/v1/product/vendor/:vendor_id", middleware.AddTraceID, product.ListProductsByVendor)

// CART
router.post("/api/v1/cart", middleware.AddTraceID, cart.Createcart)

// ORDER
router.post("/api/v1/order", middleware.AddTraceID, order.CreateOrder)
router.get("/api/v1/order/:order_id", middleware.AddTraceID, order.GetOrder);

//shipment
router.get("/api/v1/shipment/:tracking_no", middleware.AddTraceID, shipment.GetShipment);

// Export the router
export { router };
