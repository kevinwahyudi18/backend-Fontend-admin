const { 
  fetchAllProducts, 
  postFullProduct, 
  fetchSingleProductById, 
  deleteFullProduct,
  postProductDetail,
  deleteOneProductDetail,
  postProduct,
  putProductWithDetail
  
} = require("../services/product.service");
const CustomAPIError = require("../middlewares/custom-error");
const cloudinary = require('../../lib/cloudinary');
const upload = require('../../lib/multer');

const getAllProducts = async (req, res) => {
  try {
    const products = await fetchAllProducts();
    return res.json({
      status: "success",
      message: "All products are presented",
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createProduct = async (req, res) => {
  const product = await postFullProduct(req.body);
  return res.json({
    status: "success",
    message: "product is created successfully",
    data: product,
  });
};

const getSingleProduct = async (req, res) => {
  const { id }  = req.params;
  const product = await fetchSingleProductById(id);
  if (!product) {
    throw new CustomAPIError("error fetching product", 404);
  }
  return res.json({
    status: "success",
    message: "Product is fetched successfully",
    data: product,
  });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await deleteFullProduct(id);
  return res.json({
    status: "success",
    message: "product is deleted successfully",
    data: deletedProduct,
  });
};

// Product Detail
const createProductDetail = async (req, res) => {
  try {
    upload.single('photo')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      const { id } = req.params;
      const { color, stock, price, weight } = req.body;
      const file = req.file;

      if (!file) {
        return res.status(400).json({ error: 'No image provided' });
      }

      cloudinary.uploader.upload(
        file.path,
        async (cloudinaryErr, result) => {
          if (cloudinaryErr) {
            return res.status(400).json({ error: cloudinaryErr.message });
          }
          const photo = result.secure_url;

          const createdProductDetail = await postProductDetail(
            id,
            {
              color,
              stock,
              price,
              weight,
              photo
            }
          );
          console.log(createProductDetail,"<<<<<<<<")

          return res.status(201).json({ productDetail: createdProductDetail });
        }
      );
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const deleteProductDetail = async (req, res) => {
  const { id } = req.params;
  const deletedProductDetail = await deleteOneProductDetail(id);
  return res.json({
    status: "success",
    message: "product detail is deleted successfully",
    data: deletedProductDetail,
  });
};

const createProductWithDetail = async (req, res) => {
  try {
    upload.single('photo')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const { name, description, type, category_id, warehouse_id, color, stock, price, weight } = req.body;
      const file = req.file;

      if (!file) {
        return res.status(400).json({ error: 'No image provided' });
      }

      try {
        cloudinary.uploader.upload(file.path, async (cloudinaryErr, result) => {
          if (cloudinaryErr) {
            return res.status(400).json({ error: cloudinaryErr.message });
          }

          const photo = result.secure_url;

          const productData = {
            name,
            description,
            type,
            category_id: +category_id,
            warehouse_id: +warehouse_id,
            product_detail: [{ color, stock: +stock, price: +price, weight: +weight, photo }],
          };

          try {
            const createdProduct = await postProduct(productData);
            return res.status(201).json({ data: createdProduct });
          } catch (error) {
            return res.status(500).json({ error: `Error creating product: ${error.message}` });
          }
        });
      } catch (error) {
        return res.status(500).json({ error: `Error uploading image: ${error.message}` });
      }
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const updateProductWithDetail = async (req, res) => {
  try {
    upload.single('photo')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const { id } = req.params;
      const { name, description, type, category_id, warehouse_id, color, stock, price, weight } = req.body;
      const file = req.file;

      try {
        let photo;

        if (file) {
          const cloudinaryResult = await cloudinary.uploader.upload(file.path);
          photo = cloudinaryResult.secure_url;
        }

        const updatedProduct = await putProductWithDetail(id, {
          name,
          description,
          type,
          category_id,
          warehouse_id,
          color,
          stock,
          price,
          weight,
          photo,
        });

        return res.status(200).json({ data: updatedProduct });
      } catch (error) {
        return res.status(500).json({ error: `Error updating product: ${error.message}` });
      }
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}



module.exports = {
  getAllProducts,
  createProduct,
  getSingleProduct,
  deleteProduct,
  createProductDetail,
  deleteProductDetail,
  createProductWithDetail,
  updateProductWithDetail
};
