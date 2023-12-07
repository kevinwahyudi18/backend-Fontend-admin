const controllers = require("../controllers/order-status.controller")
const express = require("express")
const router = express.Router()

router.get("/", controllers.getAllOrderStatus)
router.put("/:id", controllers.updateOrderStatus)

module.exports = router