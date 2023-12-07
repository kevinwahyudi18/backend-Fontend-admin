const router = require("express").Router();
const crudCategory = require("./api/routes/category.route");
const crudProduct = require("./api/routes/product.route");
const crudUser = require("./api/routes/user.route");
const adminRoute = require("./api/routes/admin.route");
const crudPaymentMethod = require("./api/routes/payment-method.route");
const {
  verifyTokenAdmin,
} = require("../src/api/middlewares/verifyTokenMiddleware");
const crudAddress = require("./api/routes/address.route");
const crudCart = require("./api/routes/cart.route");
const crudCartProduct = require("./api/routes/cartProduct.route");
const rajaOngkir = require("./api/routes/rajaOngkir.route");
const crudWarehouse = require("./api/routes/warehouse.route");
const crudPayment = require("./api/routes/payment.route");
const crudUpload = require("./api/routes/upload.route");
const orderRoute= require("./api/routes/order.route")
const orderStatusRoute= require("./api/routes/order-status.route")

// api routes
router.use("/api/category", crudCategory);
router.use("/api/admin", adminRoute);
router.use("/api/products", crudProduct);
router.use("/api/paymentmethod", crudPaymentMethod);
router.use("/api/user", crudUser);
router.use("/api/address", crudAddress);
router.use("/api/cart", crudCart);
router.use("/api/cartproduct", crudCartProduct);
router.use("/api/rajaongkir", rajaOngkir);
router.use("/api/warehouse", crudWarehouse);
router.use("/api/payment", crudPayment);
router.use("/api/upload", crudUpload);
router.use("/api/order-status", orderStatusRoute)
router.use("/api/order", orderRoute)

module.exports = router;
