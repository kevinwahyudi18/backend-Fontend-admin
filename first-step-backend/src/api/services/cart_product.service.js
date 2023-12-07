const prisma = require("../../lib/prisma");
const CustomAPIError = require("../middlewares/custom-error");

const update = async (pathParams, params) => {
  const { id } = pathParams;
  const { quantity } = params;
  const existingRecord = await prisma.cart_Product.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!existingRecord) {
    throw new CustomAPIError("Please provide all of the required fields", 400);
  }

  return await prisma.cart_Product.update({
    where: {
      id: parseInt(id),
    },
    data: {
      quantity: parseInt(quantity),
    },
  });
};

const deleteQuantity = async (pathParams) => {
    const { id } = pathParams;
    const existingRecord = await prisma.cart_Product.findUnique({
        where: {
            id: parseInt(id),
        },
    });

    if (!existingRecord) {
        throw new CustomAPIError("Record not found", 404); // Adjust the error message and status code as needed
    }

    const data = await prisma.cart_Product.delete({
        where: { id: parseInt(id) }, // Use parseInt on id
    });
    return data;
};

const createCartProduct = async (authUserId, product_id, quantity) => {
    try {
      // Retrieve the cart_id associated with the authenticated user
      const userCart = await prisma.user.findUnique({
        where: {
          id: authUserId,
        },
        select: {
          cart: {
            where: {
              user_id: authUserId,
            },
          },
        },
      });
  
      if (!userCart) {
        throw new Error('User cart not found');
      }
  
      const { id: cart_id } = userCart.cart[0];
  
      const createdCartProduct = await prisma.cart_Product.create({
        data: {
          product_id: product_id,
          cart_id: cart_id,
          quantity: quantity,
        },
      });
  
      return createdCartProduct;
    } catch (error) {
      throw new Error(`Failed to create cart product: ${error.message}`);
    }
};

module.exports = {
  update,
  deleteQuantity,
  createCartProduct
};
