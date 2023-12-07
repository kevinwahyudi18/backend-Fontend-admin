const prisma = require("../../lib/prisma");
const CustomAPIError = require("../middlewares/custom-error");

const findAll = async (params) => {
  // Solved
  const { name } = params;
  const payment_Method = await prisma.payment_Method.findMany();
  return payment_Method;
};

const findOne = async (params) => {
  //solved
  try {
    const { id } = params;
    const payment_Method = await prisma.payment_Method.findUnique({
      where: {
        id: +id,
      },
    });

    if (!payment_Method.data) {
      throw new CustomAPIError(`No Category with id ${id} was found`, 400);
    }

    return payment_Method;
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(`Error: ${error.message}`, error.statusCode || 500);
  }
};

const create = async (params) => {
  //Solved
  try {
    const { value } = params;
    const payment_Method = await prisma.payment_Method.create({
      data: {
        value,
      },
    });
    return payment_Method;
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(`Error creating category: ${error.message}`, 500);
  }
};

const update = async (pathParams, params) => {
  console.log("id:",pathParams,"value:", params);
  try {
    const { id } = pathParams;
    const { value } = params;
    console.log(id,value,"<<<<<<< Services id");
    console.log(pathParams,params,"<<<<<<< Services" );

    // if (!id || !value) {
    //   throw new CustomAPIError("Please provide all of the required fields", 400);
    // }

    const updatedPaymentMethod = await prisma.payment_Method.update({
      where: {
        id : +pathParams,
      },
      data: {
        value: params,
        updated_at: new Date(),
      },
    });

    return updatedPaymentMethod;
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(`${error.message}`, error.statusCode || 500);
  }
};

const destroy = async (params) => {
  try {
      const { id } = params;
      const payment_Method = await prisma.payment_Method.delete({
          where: {
              id: +id,
          },
      });
      return payment_Method;
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
  destroy
};
