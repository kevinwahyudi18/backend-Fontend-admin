const CustomAPIError = require("../middlewares/custom-error");
const categoryServices = require("../services/category.service");

const getAllCategory = async (req, res) => {
  try {
    const data = await categoryServices.findAll(req.query);
    console.log(req.query)
    return res.json({
      status: "success",
      message: "this is all the category available",
      data: data,
    });
  } catch (error) {
    throw new CustomAPIError(`Error: ${error.message}`, error.statusCode || 500);
  }
};

const getOneCategory = async (req, res) => {
  try {
    const categories = await categoryServices.findOne(req.params);

    res.status(200).json({
      status: "success",
      message: "Get Categories",
      data: categories,
    });
  } catch (error) {
    throw error;
  }
};

const newCategory = async (req, res) => {
  try {
    const categories = await categoryServices.create(req.body);
    if (!categories) {
      throw new CustomAPIError(`No Category with id ${req.params.id}`, 400);
    }
    res.status(201).json({
      status: "success",
      message: "Create New Category Succesfully",
      data: categories,
    });
  } catch (error) {
    throw new CustomAPIError(`Error creating category: ${error.message}`, error.statusCode || 500);
  }
};

const updateCategory = async (req, res) => {
  try {
    const updatedCategories = await categoryServices.update(req.params, req.body);
    res.status(200).json({
      status: "success",
      message: "Update Category Succesfully",
      data: updatedCategories,
    });
  } catch (error) {
    throw new CustomAPIError(`Error: ${error.message}`, error.statusCode || 500);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categories = await categoryServices.destroy(req.params);
    res.status(200).json({
      status: "success",
      message: "Delete Category Succesfully",
      data: categories,
    });
  } catch (error) {
    throw new CustomAPIError(`Error: ${error.message}`, 500);
  }
};

module.exports = {
  getAllCategory,
  getOneCategory,
  newCategory,
  updateCategory,
  deleteCategory,
};
