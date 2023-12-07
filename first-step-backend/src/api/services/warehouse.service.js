const prisma = require("../../lib/prisma");
const CustomAPIError = require("../middlewares/custom-error");

const findAll = async (admin_id) => {
  try {
    const allWarehouse = await prisma.warehouse.findMany({
      where: {
        admin_id: admin_id,
      },
      include: {
        product: true,
      },
    });

    if (!allWarehouse[0]) {
      throw new CustomAPIError(`No warehouse with id of ${admin_id}`, 400);
    }

    return allWarehouse;
  } catch (error) {
    throw new CustomAPIError(`Error warehouse: ${error.message}`, 500);
  }
};

const create = async (admin_id, params) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: { id: admin_id },
    });

    const { warehouse_name, address } = params;

    const createWarehouse = await prisma.warehouse.create({
      data: {
        address,
        warehouse_name,
        admin_id: admin.id,
      },
    });

    return createWarehouse;
  } catch (error) {
    throw new CustomAPIError(`Error creating category: ${error.message}`, 500);
  }
};

const update = async (pathParams, params) => {
  try {
    const { id } = pathParams;
    const { warehouse_name, address } = params;

    if (!id || !warehouse_name) {
      throw new CustomAPIError("Please provide all of the required fields", 400);
    }

    const updatedWarehouse = await prisma.warehouse.update({
      where: {
        id: +id,
      },
      data: {
        warehouse_name: warehouse_name,
        address: address,
      },
    });
    return updatedWarehouse;
  } catch (error) {
    throw new CustomAPIError(`Error updating warehouse: ${error.message}`, 500);
  }
};

const destroy = async (params) => {
  try {
    const { id } = params;
    const categories = prisma.warehouse.delete({
      where: {
        id: +id,
      },
    });
    return categories;
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(`Error: ${error.message}`, 500);
  }
};

module.exports = {
  findAll,
  create,
  update,
  destroy,
};
