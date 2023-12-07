const { update, deleteQuantity, createCartProduct } = require("../services/cart_product.service");

const updateQuantity = async (req, res) => {
  try {
    const updatedRecord = await update(req.params, req.body);
    res.status(200).json({
        message: "Update Quantity Succesfully",
        data: updatedRecord,
        });
    } catch (error) {
        throw error;
    }

};

const deletedQuantity = async (req, res) => {
    try{
        const deleteRecord = await deleteQuantity(req.params);
        res.status(200).json({
            message: "Delete Quantity Succesfully",
            data: deleteRecord,
        });
    } catch (error) {
        throw error;
    }
}

async function createdCartProduct(req, res) {
    const userId = req.user.id;
  
    const { product_id, quantity } = req.body;
  
    try {
      const createdCartProduct = await createCartProduct(userId, product_id, quantity);
      
      res.status(201).json({
        message: "Cart product created successfully",
        data: createdCartProduct,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

module.exports = {
  updateQuantity,
  deletedQuantity,
  createdCartProduct
};
