const orderStatusServices = require('../services/order-status.service')
const CustomAPIError = require('../middlewares/custom-error')

const getAllOrderStatus = async (req, res) => {
  try {

    const orders = await orderStatusServices.findAllOrderStatuses()

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


const updateOrderStatus = async (req, res) => {
  try {

    const { status } = req.body
    const { id } = req.params

    const updatedOrderStatus = await orderStatusServices.updateOrderStatus(
      status, id
    )

    res.status(200).json({
      status: "success",
      message: "Update Order Status Succesfully",
      data: updatedOrderStatus,
    })

  } catch (error) {
    throw new CustomAPIError(`Error: ${error.message}`, error.statusCode || 500)
  }
}

module.exports = {
  getAllOrderStatus,
  updateOrderStatus
}