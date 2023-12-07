const controllers = require("../controllers/user.controller");
const { verifyTokenUser } = require("../middlewares/verifyTokenMiddleware");

const router = require("express").Router();
router.get("/", controllers.getAllUsers);
router.get("/:id", controllers.getUserId);
router.post("/register", controllers.registerUser);
router.post("/login", controllers.loginUser);
router.put("/", verifyTokenUser, controllers.updateUser);
router.delete("/:id", verifyTokenUser, controllers.deleteUser);

module.exports = router;