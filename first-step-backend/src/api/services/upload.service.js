const prisma = require("../../lib/prisma");
const CustomAPIError = require("../middlewares/custom-error");

const findAll = async (params) => {
  const { name } = params;
  const upload = await prisma.upload.findMany();
  return upload;
};

const findOne = async (params) => {
  try {
    const { id } = params;
    const upload = await prisma.upload.findUnique({
      where: {
        id: +id,
      },
    });

    if (!upload) {
      throw new CustomAPIError(`No upload with id ${id} was found`, 400);
    }

    return upload;
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(
      `Error: ${error.message}`,
      error.statusCode || 500
    );
  }
};

const create = async (paymentId, data) => {
  try {
    let { admin_id = +admin_id, payment_id = +paymentId, photo } = data;
    console.log("data", data);
    const upload = await prisma.upload.create({
      data: {
        admin_id: +admin_id,
        payment_id: +payment_id,
        photo,
      },
    });
    return upload;
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(`Error creating upload: ${error.message}`, 500);
  }
};

const update = async (pathParams, data) => {
  try {
    const { id } = pathParams;
    const { admin_id = +admin_id, payment_id = +payment_id, photo } = data;
    // console.log("pathParams", pathParams);
    // console.log("data", data);
    // console.log("id", id);
    // console.log("admin_id", admin_id);
    // console.log("payment_id", payment_id);
    // if (!id || !admin_id || !payment_id || !photo) {
    //   throw new CustomAPIError(
    //     "Please provide all of the required fields",
    //     400
    //   );
    // }
    const updateUpload = await prisma.upload.update({
      where: {
        id: +id,
      },
      data: {
        admin_id: +admin_id,
        payment_id: +payment_id,
        photo: photo,
      },
    });
    return updateUpload;
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(`${error.message}`, error.statusCode || 500);
  }
};

const destroy = async (params) => {
  try {
    const { id } = params;
    const upload = await prisma.upload.delete({
      where: {
        id: +id,
      },
    });
    return upload;
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(`Error: ${error.message}`, 500);
  }
};

module.exports = {
  findAll,
  findOne,
  create,
  update,
  destroy,
};
