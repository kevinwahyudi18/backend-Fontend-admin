const prisma = require("../../lib/prisma");
const CustomAPIError = require("../middlewares/custom-error");

const findAll = async (user_id) => {
  try {
    const address = await prisma.address.findMany({
      where: {
        user_id: user_id,
      },
    });

    if (!address[0]) {
      throw new CustomAPIError(`No User Address with id of ${user_id}`, 400);
    }

    return address;
  } catch (error) {
    throw new CustomAPIError(`Error creating category: ${error.message}`, 500);
  }
};

const create = async (user_id, params) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: user_id },
    });

    const { address, city, postal_code, phone } = params;

    const addressUser = await prisma.address.create({
      data: {
        address,
        city,
        postal_code,
        phone,
        user_id: user.id,
      },
    });

    return addressUser;
  } catch (error) {
    throw new CustomAPIError(`Error creating category: ${error.message}`, 500);
  }
};

const update = async (params) => {
  try {
    const addressUser = await prisma.address.findUnique({
      where: { id: +params.id },
    });
    if (!addressUser) {
      throw new CustomAPIError("Address with id " + id + " not found", 400);
    }
    const { address, city, postal_code, phone } = params;

    await prisma.address.update({
      where: {
        id: +addressUser.id,
      },
      data: {
        address: address || addressUser.address,
        city: city || addressUser.city,
        postal_code: postal_code || addressUser.postal_code,
        phone: phone || addressUser.phone,
      },
    });

    const updateAddress = await prisma.address.findUnique({
      where: { id: +params.id },
    });

    return updateAddress;
  } catch (error) {
    throw new CustomAPIError(`Error updating category: ${error.message}`, 500);
  }
};

const destroy = async (user_id, params) => {
  try {
    const address = await prisma.address.findUnique({
      where: { id: +params.id },
    });
    if (!address) {
      throw new CustomAPIError("Address with id " + params.id + " not found", 400);
    }
    await prisma.address.delete({
      where: {
        id: +address.id,
      },
    });
    return {
      deletedAddress: address,
    };
  } catch (error) {
    throw new CustomAPIError(`Error creating category: ${error.message}`, 500);
  }
};

module.exports = {
  findAll,
  create,
  update,
  destroy,
};
