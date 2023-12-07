const prisma = require("../../lib/prisma");
const CustomAPIError = require("../middlewares/custom-error");

const getCartByUserId = async (user_id) => {
  return prisma.cart.findUnique({
    where: { user_id: user_id },
    include: {
      cart_product: {
        include: { product: true },
        orderBy: {
          id: "asc", // Order by CartProduct id in ascending order
        },
      },
    },
  });
};

const createCartProduct = async (product_id, userId, quantity) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        cart: true,
      },
    });

    let cart = user.cart; // Use user's cart if it exists

    if (!cart) {
      // If user doesn't have a cart, create a new one
      cart = await prisma.cart.create({
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }

    // Menambahkan produk ke dalam keranjang
    const addedProduct = await prisma.cart_Product.create({
      data: {
        product: {
          connect: {
            id: product_id,
          },
        },
        cart: {
          connect: {
            id: 3,
          },
        },
        quantity: quantity,
      },
      include: {
        product: true,
      },
    });

    return addedProduct;
  } catch (error) {
    throw new Error(`Gagal menambahkan produk ke dalam keranjang: ${error}`);
  }
};

const deleteCartProduct = async (userId, productId) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        cart: {
          include: {
            cart_product: true,
          },
        },
      },
    });

    if (!user) {
      throw new CustomAPIError('User not found', 404);
    }

    const cart = user.cart;

    if (!cart) {
      throw new CustomAPIError('Cart not found', 404);
    }

    const cartProduct = cart.cart_product.find((item) => item.product.id === productId);

    if (!cartProduct) {
      throw new CustomAPIError('Cart product not found', 404);
    }

    await prisma.cart_Product.delete({
      where: { id: cartProduct.id },
    });

    return { message: 'Cart product deleted successfully' };
  } catch (error) {
    throw new CustomAPIError(error.message, 500);
  }
};

const fetchCart = async (user_id) => {
  await cartLogic({ id: user_id });

  return prisma.cart.findUnique({
    where: { user_id: user_id },
    include: {
      cart_product: {
        include: {
          product: true
        },
        orderBy: {
          id: "asc", // Order by CartProduct id in ascending order
        },
      },
    },
  });
};

const cartLogic = async (payload) => {
  try {
    const {
      id,
      shipping_cost,
      product_details,
      courier,
    } = payload;
    console.log(payload);
    const result = await prisma.$transaction(async (tx) => {
      // Find or create a user's cart
      const userCart = await tx.cart.findUnique({
        where: { user_id: id },
      });
      if (product_details) {
        const { id: product_id, quantity, price } = product_details;

        // Check if there's already a CartProduct with the same product details id
        const existingCartProduct = await tx.cart_Product.findFirst({
          where: {
            product_id,
            cart_id: userCart.id,
          },
        });

        if (existingCartProduct) {
          // Update existing CartProduct
          await tx.cart_Product.update({
            where: { id: existingCartProduct.id },
            data: { quantity, price },
          });
        } else {
          // Create a new CartProduct
          await tx.cart_Product.create({
            data: {
              product_id,
              cart_id: userCart.id,
              quantity,
              price,
            },
          });
        }
      }
      // Re-fetch CartProduct records for the user's cart
      const cartProducts = await tx.cart_Product.findMany({
        where: { cart_id: userCart.id },
      });

      // Initialize variables for total_price and total_weight
      let total_price = 0;
      let total_weight = 0;

      // Calculate total_price and total_weight
      for (const cartProduct of cartProducts) {
        total_price += cartProduct.price * cartProduct.quantity;
        total_weight += cartProduct.quantity * 100; // Assuming each item has a weight of 1
      }

      // Calculate total_payment
      const total_payment = total_price + (shipping_cost || 0);
      console.log(total_payment, shipping_cost);
      // Update cart details
      await tx.cart.update({
        where: { user_id: id },
        data: {
          shipping_cost,
          total_price,
          total_weight,
          total_payment,
          courier,
        },
      });

      // Fetch and return the updated cart
    });

    return prisma.cart.findUnique({
      where: { user_id: id },
      include: {
        cart_product: {
          include: {
            product: true,
          },
          orderBy: {
            id: "asc", // Order by CartProduct id in ascending order
          },
        },
      },
    });
  } catch (error) {
    console.error(error);
    throw new CustomAPIError(error.message, 500);
  }
};

const resetCartToDefault = async (userId) => {
  await prisma.$transaction([
    prisma.cart.update({
      where: { user_id: userId },
      data: {
        shipping_cost: null,
        total_payment: 0,
        total_weight: 0,
        total_price: 0,
        courier: null,
      },
      include: {
        user: true,
        cart_product: true,
      },
    }),
    prisma.cart_Product.deleteMany({
      where: {
        cart: {
          user_id: userId,
        },
      },
    }),
  ]);

  return prisma.cart.findUnique({
    where: { user_id: userId },
    include: {
      user: true,
      cart_product: true,
    },
  });
};

module.exports = {
  getCartByUserId,
  createCartProduct,
  deleteCartProduct,
  fetchCart,
  cartLogic,
  resetCartToDefault
};
