const controllers = require("../controllers/order.controller")
const express = require("express")
const router = express.Router()

router.get("/", controllers.getAllOrders)
router.get("/:id", controllers.getOneOrder)
router.post("/", controllers.createOrder)
// router.put("/:id", controllers.updateOrder)
router.delete("/:id", controllers.deleteOrder)

module.exports = router