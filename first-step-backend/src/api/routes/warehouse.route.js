const controllers = require("../controllers/warehouse.controller");
const { verifyTokenUser, verifyTokenAdmin } = require("../middlewares/verifyTokenMiddleware");
const router = require("express").Router();

router.get("/", verifyTokenAdmin, controllers.getAllWarehouse);
router.post("/", verifyTokenAdmin, controllers.newWarehouse);
router.put("/:id", verifyTokenAdmin, controllers.updateWarehouse);
router.delete("/:id", verifyTokenAdmin, controllers.deleteWarehouse);

module.exports = router;