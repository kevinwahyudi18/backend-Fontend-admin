const prisma = require('../../lib/prisma')
const CustomAPIError = require("../middlewares/custom-error")
const axios = require('axios')
const qs = require('qs')
require('dotenv').config()

const findAllOrders = async (params) => {
  const filterOptions = {
    where: {},
    include: {
      cart: true,
      address: true,
      order_status: true,
      payment: true,
    },
    orderBy: {
      id: 'asc',
    },
  }

  try {
    const orders = await prisma.order.findMany(filterOptions)

    return orders
  } catch (error) {
    console.log('Error fetching orders:', error)
    throw new CustomAPIError(`${error.message}`, error.statusCode || 500)
  }
}

const findOneOrder = async (params) => {
  try {
    const { id } = params

    const order = await prisma.order.findUnique({
      where: {
        id: +id,
      },
      include: {
        cart: true,
        address: true,
        order_status: true,
        payment: true,
      },
    })

    if (!order) {
      throw new CustomAPIError(`No Order with id ${id} was found`, 400)
    }

    return order
  } catch (error) {
    console.log(error)
    throw new CustomAPIError(`Error: ${error.message}`, error.statusCode || 500)
  }
}


const createOrder = async (cart_id, shippingCost) => {
  try {

    // find cart product
    const cartProducts = await prisma.Cart_Product.findMany({
      where: {
        cart_id: +cart_id,
      },
      include: {
        product: {
          include: {
            product_detail: true,
          },
        },
      }
    });

    const products = cartProducts[0].product

    const productDetails = products.product_detail
  
    const productQuantities = cartProducts.map((p) => p.quantity);
      
    // total price from items
    const totalProductPrice = productDetails.reduce((total, productDetail, index) => {
      const itemPrice = productDetail.price || 0;
      const quantity = productQuantities[index] || 0;
      return total + itemPrice * quantity;
    }, 0);

    const cart = await prisma.Cart.findUnique({
      where: {
        id: +cart_id,
      }
    }) 

    const user = cart.user_id

    const userAddress = await prisma.address.findUnique({
      where: {
        user_id: user,
      },
      include: {
        city: true,
      },
    });

    const userAddressId = userAddress.id

    console.log(`Product Price : ${totalProductPrice}`)

    // total payment
    const totalPrice = totalProductPrice + shippingCost

    // create order in database
    const newOrder = await prisma.order.create({
      data: {
        cart_id: +cart_id,
        address_id: +userAddressId,
        shipping_price: +shippingCost,
        price: +totalPrice,
        order_status: {
          create: {
            status: 'Pending',
          },
        },
      },
      include: {
        cart: {
          include: {
            user: true,
            cart_product: true
          }
        },
        address: true,
        order_status: true,
        payment: true,
      },
    })

    if(newOrder) {
      
    }

    return newOrder
  } catch (error) {
    console.log(error)
    throw new CustomAPIError(`${error.message}`, error.statusCode || 500)
  }
}

const destroyOrder = async (params) => {
  try {
    
    const { id } = params

    const deletedOrder = await prisma.order.delete({
      where: {
        id: +id,
      },
      include: {
        cart: true,
        address: true,
        order_status: true,
        payment: true,
      },
    })

    return deletedOrder
  } catch (error) {
    console.log(error)
    throw new CustomAPIError(`${error.message}`, error.statusCode || 500)
  }
}

module.exports = {
    findAllOrders,
    findOneOrder,
    createOrder,
    // updateOrder,
    destroyOrder
}