const prisma = require("../../lib/prisma")
const CustomAPIError = require("../middlewares/custom-error")

const findAllOrderStatuses = async () => {
  try {
    const orderStatuses = await prisma.Order_Status.findMany()
    return orderStatuses
  } catch (error) {
    throw error
  }
}

const updateOrderStatus = async (status, id) => {

  try {

    const orderStatus = await prisma.Order_Status.update({
      where: {
        id: +id,
      },
      data: {
        status
      }
    })

    if (!orderStatus) {
      throw new CustomAPIError("Order Status Id not found", 400);
    }

    return orderStatus
  } catch (error) {
    throw error
  }
}

module.exports = {
  findAllOrderStatuses,
  updateOrderStatus,
}