const CustomAPIError = require("../middlewares/custom-error");
const paymentMethodServices = require("../services/payment-method.service");

const getAllpaymentMethods = async (req, res) => { //Solved
  try {
    const paymentMethods = await paymentMethodServices.findAll(req.query);
    if (paymentMethods.length === 0) {
      throw new CustomAPIError(`No Category was found`, 400);
    }
    res.status(200).json({
      status: "success",
      message: "Get All paymentMethod",
      data: paymentMethods,
    });
  } catch (error) {
    throw new CustomAPIError(`Error: ${error.message}`, error.statusCode || 500);
  }
};

const getOnepaymentMethods = async (req, res) => {
    try {
        const paymentMethods = await paymentMethodServices.findOne(req.params);
    
        res.status(200).json({
            status: "success",
            message: "Get paymentMethods",
            data: paymentMethods,
        });
    } catch (error) {
        throw error;
    }
};

const newpaymentMethods = async (req, res) => {
    try {
        const paymentMethods = await paymentMethodServices.create(req.body);
        if (!paymentMethods) {
            throw new CustomAPIError(`No Payment Method with id ${req.params.id}`, 400);
        }
        res.status(201).json({
            status: "success",
            message: "Create New paymentMethods Succesfully",
            data: paymentMethods,
        });
    } catch (error) {
        throw new CustomAPIError(
            `Error creating paymentMethods: ${error.message}`,
            error.statusCode || 500
        );
    }
};

const updatedPaymentMethod = async (req, res) => {
    console.log("id",req.params);
    console.log("value",req.body);
    try {
        const { id } = req.params;
        const { value } = req.body;
        console.log(id,value,"<<<<<<<< Controller")
      
        const updatedPaymentMethod = await paymentMethodServices.update(id, value);
        res.status(200).json({
            status: "success",
            message: "Update Category Succesfully",
            data: updatedPaymentMethod,
        });
    } catch (error) {
        throw new CustomAPIError(
            `Error: ${error.message}`,
            error.statusCode || 500
        );
    }
};

const deletePaymentMethod = async (req, res) => {
    try {
      const payment_Method = await paymentMethodServices.destroy(req.params);
      res.status(200).json({
        status: "success",
        message: "Delete Category Succesfully",
        data: payment_Method,
      });
    } catch (error) {
      throw new CustomAPIError(`Error: ${error.message}`, 500);
    }
  };

module.exports = {
    getAllpaymentMethods,
    getOnepaymentMethods,
    newpaymentMethods,
    updatedPaymentMethod,
    deletePaymentMethod
};
