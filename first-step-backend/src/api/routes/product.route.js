const prisma = require("../../lib/prisma");
const { 
    getAllProducts,
    createProduct,
    getSingleProduct,
    deleteProduct,
    createProductDetail,
    deleteProductDetail,
    createProductWithDetail,
    updateProductWithDetail,
} = require("../controllers/product.controller");
const router = require("express").Router();

router.get("/", getAllProducts);
router.post("/", createProduct);
router.get("/:id", getSingleProduct);
router.delete("/:id", deleteProduct);

// Product Detail
router.post("/details/:id", createProductDetail);
router.delete("/details/:id", deleteProductDetail);

// tambahin /admin/ pada frontend
router.post("/admin/", createProductWithDetail); 
router.put("/admin/:id", updateProductWithDetail);

module.exports = router;
