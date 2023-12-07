const controllers = require("../controllers/payment-method.controller");

const router = require("express").Router();
router.get("/", controllers.getAllpaymentMethods);
router.get("/:id", controllers.getOnepaymentMethods);
router.post("/", controllers.newpaymentMethods);
router.put("/:id", controllers.updatedPaymentMethod);
router.delete("/:id", controllers.deletePaymentMethod);

module.exports = router;