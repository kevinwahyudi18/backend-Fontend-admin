const prisma = require("../../lib/prisma");
const CustomAPIError = require("../middlewares/custom-error");

const findAll = async (params) => {
  const filterOptions = {
    where: {},
    include: {
      product: { include: { product_detail: true } },
    },
    orderBy: {
      id: "asc", // Order by id in ascending order
    },
  };
  const { name } = params;

  if (name) {
    filterOptions.where.category_name = {
      contains: name,
      mode: "insensitive",
    };
  }

  const categories = await prisma.category.findMany(filterOptions);
  return categories;
};

const findOne = async (params) => {
  //Solved
  try {
    const { id } = params;
    const categories = prisma.category.findUnique({
      where: {
        id: +id,
      },
      include: {
        product: { include: { product_detail: true } },
      },
    });

    if (!categories.data) {
      throw new CustomAPIError(`No Category with id ${id} was found`, 400);
    }

    return categories;
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(`Error: ${error.message}`, error.statusCode || 500);
  }
};

const create = async (params) => {
  //Solved
  try {
    const { category_name } = params;
    const categories = await prisma.category.create({
      data: {
        category_name,
      },
    });
    return categories;
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(`Error creating category: ${error.message}`, 500);
  }
};

const update = async (pathParams, params) => {
  try {
    const { id } = pathParams;
    const { category_name } = params;

    if (!id || !category_name) {
      throw new CustomAPIError("Please provide all of the required fields", 400);
    }

    const updatedCategory = await prisma.category.update({
      where: {
        id: +id,
      },
      data: {
        category_name: category_name,
      },
    });
    return updatedCategory;
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(`${error.message}`, error.statusCode || 500);
  }
};

const destroy = async (params) => {
  try {
    const { id } = params;
    const categories = prisma.category.delete({
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
  findOne,
  create,
  update,
  destroy,
};
