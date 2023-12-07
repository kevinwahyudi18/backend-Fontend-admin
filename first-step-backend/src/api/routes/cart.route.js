const {
  showCart,
  deleteCart,
  addToCart,
  resetCart
} = require("../controllers/cart.controller");
const { verifyTokenUser } = require("../middlewares/verifyTokenMiddleware");

const router = require("express").Router();

// router.put("/", verifyTokenUser, updateCart);
router.get("/", verifyTokenUser, showCart);
router.post("/", verifyTokenUser, addToCart);
router.delete("/", verifyTokenUser, deleteCart);
// router.post("/", verifyTokenUser, resetCart);
module.exports = router;