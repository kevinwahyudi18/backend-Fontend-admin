const { createAdmin, login, updateAdmin, deleteAdmin } = require("../controllers/admin.controller");

const { verifyTokenAdmin } = require("../middlewares/verifyTokenMiddleware");
const router = require("express").Router();

router.post("/register", createAdmin);
router.post("/login", login);

router.use(verifyTokenAdmin);
router.put("/admin/:id", updateAdmin);
router.delete("/admin/:id", deleteAdmin);

module.exports = router;
