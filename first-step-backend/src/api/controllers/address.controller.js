const addressServices = require("../services/address.service");

const getAllAddress = async (req, res) => {
  try {
    const address = await addressServices.findAll(+req.user.id);
    res.status(200).json({
      message: "Get All Address succesfully",
      data: address,
    });
  } catch (error) {
    throw error;
  }
};

const newAddress = async (req, res) => {
  try {
    const address = await addressServices.create(+req.user.id, req.body);
    res.status(201).json({
      message: "Create New Address Succesfully",
      data: address,
    });
  } catch (error) {
    throw error;
  }
};

const updateAddress = async (req, res) => {
  try {
    const address = await addressServices.update(+req.user.id, req.body);
    res.status(200).json({
      message: "Update Address Succesfully",
      data: address,
    });
  } catch (error) {
    throw error;
  }
};

const deleteAddress = async (req, res) => {
  try {
    const address = await addressServices.destroy(+req.user.id, req.body);
    res.status(200).json({
      message: "Delete Address Succesfully",
      data: address,
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllAddress,
  newAddress,
  updateAddress,
  deleteAddress,
};
