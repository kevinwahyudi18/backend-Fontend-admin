const controllers = require("../controllers/address.controller");
const { verifyTokenUser } = require("../middlewares/verifyTokenMiddleware");
const router = require("express").Router();

router.get("/", verifyTokenUser, controllers.getAllAddress);
// router.post("/", verifyTokenUser, controllers.newAddress);
// router.put("/", verifyTokenUser, controllers.updateAddress);
// router.delete("/", verifyTokenUser, controllers.deleteAddress);

module.exports = router;