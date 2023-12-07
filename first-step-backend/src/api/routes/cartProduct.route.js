const prisma = require("../../lib/prisma");
const { verifyTokenUser } = require("../middlewares/verifyTokenMiddleware");
const router = require("express").Router();
const { 
  updateQuantity,
  deletedQuantity,
  createdCartProduct
} = require("../controllers/cartProduct.controller");

router.put("/:id", verifyTokenUser, updateQuantity)
router.delete("/:id", verifyTokenUser, deletedQuantity)
router.post("/", verifyTokenUser, createdCartProduct)

module.exports = router;