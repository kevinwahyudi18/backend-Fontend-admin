const warehouseServices = require("../services/warehouse.service");

const getAllWarehouse = async (req, res) => {
  try {
    const warehouse = await warehouseServices.findAll(+req.admin.id);
    res.status(200).json({
      message: "Get All warehousesuccesfully",
      data: warehouse,
    });
  } catch (error) {
    throw error;
  }
};

const newWarehouse = async (req, res) => {
  try {
    const warehouse = await warehouseServices.create(+req.admin.id, req.body);
    res.status(201).json({
      message: "Create New Warehouse Succesfully",
      data: warehouse,
    });
  } catch (error) {
    throw error;
  }
};

const updateWarehouse = async (req, res) => {
  try {
    const warehouses = await warehouseServices.update(req.params, req.body);
    res.status(200).json({
      message: "Update Warehouse Succesfully",
      data: warehouses,
    });
  } catch (error) {
    throw error;
  }
};

const deleteWarehouse = async (req, res) => {
  try {
    const warehouse = await warehouseServices.destroy(req.params);
    res.status(200).json({
      status: "success",
      message: "Delete Warehouse Succesfully",
      data: warehouse,
    });
  } catch (error) {
    throw new CustomAPIError(`Error: ${error.message}`, 500);
  }
};

module.exports = {
  getAllWarehouse,
  newWarehouse,
  updateWarehouse,
  deleteWarehouse
};
