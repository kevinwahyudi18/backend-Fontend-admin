const { order } = require('../../lib/prisma')
const CustomAPIError = require('../middlewares/custom-error')
const orderServices = require('../services/order.service')

const getAllOrders = async (req, res) => {
  try {

    const orders = await orderServices.findAllOrders()

    if (orders.length === 0) {
      throw new CustomAPIError(`No Order was found`, 400)
    }

    res.status(200).json({
      status: "success",
      message: "Get All Orders",
      data: orders,
    })

  } catch (error) {
    throw new CustomAPIError(`Error: ${error.message}`, error.statusCode || 500)
  }
}

const getOneOrder = async (req, res) => {
  try {

    const orders = await orderServices.findOneOrder(req.params)
  
    res.status(200).json({
        status: "success",
        message: "Get Orders",
        data: orders,
    })

  } catch (error) {
    throw new CustomAPIError(`Error: ${error.message}`, error.statusCode || 500)
  }
}

const createOrder = async (req, res) => {
  try {

    const { cart_id, shippingCost } = req.body

    const orders = await orderServices.createOrder(cart_id, shippingCost)
    
    if (!orders) {
      throw new CustomAPIError(`No Order with id ${req.params.id}`, 400)
    }

    res.status(201).json({
      status: "success",
      message: "Create New Order Succesfully",
      data: orders,
    })

  } catch (error) {
    throw new CustomAPIError(`Error: ${error.message}`, error.statusCode || 500)
  }
}

const deleteOrder = async (req, res) => {
  try {

    orderServices.destroyOrder(req.params)

    res.status(200).json({
      status: "success",
      message: "Delete Order Succesfully",
    })
    
  } catch (error) {
    throw new CustomAPIError(`Error: ${error.message}`, error.statusCode || 500)
  }
}

module.exports = {
  getAllOrders,
  getOneOrder,
  createOrder,
  // updateOrder,
  deleteOrder
}