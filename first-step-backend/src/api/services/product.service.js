const prisma = require("../../lib/prisma");
const CustomAPIError = require("../middlewares/custom-error");

const fetchAllProducts = async () => { //solved
  const products = await prisma.product.findMany({
    include: { product_detail: true },
  });

  return products;
};

const postFullProduct = async (data) => {
  try {
    let {
      name,
      description,
      type,
      category_id,
      warehouse_id,
      product_detail,
    } = data;

    if (product_detail.length <= 0) {
      throw new CustomAPIError(`please provide a product details`, 400);
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        type,
        category_id,
        warehouse_id,
        product_detail: {
          create: product_detail // Pastikan struktur create sesuai dengan model Product_Detail
        },
      },
      include: {
        product_detail: true,
      },
    });

    if (!product) {
      throw new CustomAPIError(`Product creation is failed`, 400);
    }
    return product;
  } catch (error) {
    throw new CustomAPIError(
      `Error: ${error.message} `,
      error.statusCode || 500
    );
  }
};

const fetchSingleProductById = async (data) => {
  let product;
  console.log
  // Check if the input is numeric, assuming it's an ID
  if (!isNaN(data)) {
    product = await prisma.product.findUnique({
      where: {
        id: +data, // Convert data to a number
      },
      include: {
        category: true,
        warehouse: true,
        product_detail: {
          orderBy: {
            id: "asc",
          },
        },
      },
    });
  } 

  if (!product) {
    throw new CustomAPIError(`No product found with id: ${data}`, 400);
  }

  return product;
};

const deleteFullProduct = async (id) => {
  const product = await prisma.product.findUnique({
    where: { id: +id },
    include: { product_detail: true },
  });

  if (!product) {
    throw new CustomAPIError(`No product with id of ${id}`, 400);
  }

  // Delete Product
  await prisma.product.delete({
    where: { id: +id },
    include: {
      product_detail: true,
    },
  });

  return {
    deletedProduct: product,
  };
};


// Product Detail
const postProductDetail = async (productId, data) => {
  try {
    let {
      product_id = +productId,
      photo,
      color,
      price = +price,
      stock = +stock,
      weight = +weight,
    } = data;

    const createdProductDetail = await prisma.product_Detail.create({
      data: {
        product_id,
        photo,
        color,
        stock: parseInt(stock), // Mengubah string menjadi nilai integer
        price: parseFloat(price), // Mengubah string menjadi nilai float
        weight: parseFloat(weight), // Mengubah string menjadi nilai float
      },
    });
    console.log(createdProductDetail,"<<<<<<<<<<")
    return createdProductDetail;
  } catch (error) {
    throw new Error(`Error in creating product detail: ${error.message}`);
  }
}

const deleteOneProductDetail = async (id) => {
  const productDetail = await prisma.product_Detail.findUnique({
    where: { id: +id },
  });

  if (!productDetail) {
    throw new CustomAPIError(`No product detail with id of ${id}`, 400);
  }

  await prisma.product_Detail.delete({
    where: { id: +id },
  });

  return {
    deletedProductDetail: productDetail,
  };
};

const postProduct = async (data) => {
  try {
    const { name, description, type, category_id, warehouse_id, product_detail } = data;

    const createdProduct = await prisma.product.create({
      data: {
        name,
        description,
        type,
        category_id: +category_id,
        warehouse_id: +warehouse_id,
        product_detail: {
          create: product_detail.map(detail => ({
            color: detail.color || "default_color",
            stock: detail.stock || 0,
            price: detail.price || 0,
            weight: detail.weight || 0,
            photo: detail.photo || "default_photo_url",
          })),
        },
      },
      include: {
        product_detail: true,  // Menyertakan informasi produk_detail dalam respons
      },
    });
    console.log(createdProduct, "Produk dibuat");
    return createdProduct;
  } catch (error) {
    throw new Error(`Error dalam membuat produk: ${error.message}`);
  }
};

const putProductWithDetail = async (id, data) => {
  try {
    const {
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
    } = data;

    const updatedProduct = await prisma.product.update({
      where: { id: +id },
      data: {
        name,
        description,
        type,
        category_id: +category_id,
        warehouse_id: +warehouse_id,
        product_detail: {
          update: {
            where: { id:+id},
            data: {
              color,
              stock: +stock,
              price: +price,
              weight: +weight,
              photo,
            },
          },
        },
      },
      include: {
        product_detail: true,
      },
    });

    return updatedProduct;
  } catch (error) {
    throw new CustomAPIError(`Error updating product: ${error.message}`, 500);
  }
};

module.exports = {
    fetchAllProducts,
    postFullProduct,
    fetchSingleProductById,
    deleteFullProduct,
    postProductDetail,
    deleteOneProductDetail,
    postProduct,
    putProductWithDetail
  };