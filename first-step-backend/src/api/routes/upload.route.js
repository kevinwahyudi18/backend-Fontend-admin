const controllers = require("../controllers/upload.controller");
const router = require("express").Router();

router.get("/", controllers.getAllUploads);
router.get("/:id", controllers.getOneUploads);
router.post("/", controllers.newUploads);
router.put("/:id", controllers.updateUpload);
router.delete("/:id", controllers.deleteUpload);

module.exports = router;
