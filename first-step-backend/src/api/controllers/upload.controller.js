const CustomAPIError = require("../middlewares/custom-error");
const uploadServices = require("../services/upload.service");
const upload = require("../../lib/multer");
const cloudinary = require("../../lib/cloudinary");

const getAllUploads = async (req, res) => {
  try {
    const uploads = await uploadServices.findAll(req.query);
    if (uploads.length === 0) {
      throw new CustomAPIError(`No uploads was found`, 400);
    }
    res.status(200).json({
      status: "success",
      message: "Get All Uploads",
      data: uploads,
    });
  } catch (error) {
    throw new CustomAPIError(
      `Error: ${error.message}`,
      error.statusCode || 500
    );
  }
};

const getOneUploads = async (req, res) => {
  try {
    const uploads = await uploadServices.findOne(req.params);
    res.status(200).json({
      status: "success",
      message: "Get Upload By id",
      data: uploads,
    });
  } catch (error) {
    throw error;
  }
};

const newUploads = async (req, res) => {
  try {
    upload.single("photo")(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      const { id } = req.params;
      const { admin_id, payment_id } = req.body;
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "No image provided" });
      }
      cloudinary.uploader.upload(file.path, async (cloudinaryErr, result) => {
        if (cloudinaryErr) {
          return res.status(400).json({ error: cloudinaryErr.message });
        }
        const photo = result.secure_url;

        const createdUpload = await uploadServices.create(id, {
          admin_id,
          payment_id,
          photo,
        });
        return res.status(201).json({ upload: createdUpload });
      });
    });
  } catch (error) {
    throw new CustomAPIError(
      `Error creating upload: ${error.message}`,
      error.statusCode || 500
    );
  }
};

const updateUpload = async (req, res) => {
  try {
    upload.single("photo")(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      const { id } = req.params;
      const { admin_id, payment_id } = req.body;
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "No image provided" });
      }
      cloudinary.uploader.upload(file.path, async (cloudinaryErr, result) => {
        if (cloudinaryErr) {
          return res.status(400).json({ error: cloudinaryErr.message });
        }
        const photo = result.secure_url;
        req.body.photo = photo;
        const updatedUploads = await uploadServices.update(
          req.params,
          req.body
        );
        res.status(200).json({
          status: "success",
          message: "Update Upload Succesfully",
          data: updatedUploads,
        });
      });
    });
  } catch (error) {
    throw new CustomAPIError(
      `Error creating upload: ${error.message}`,
      error.statusCode || 500
    );
  }
};

const deleteUpload = async (req, res) => {
  try {
    const upload = await uploadServices.destroy(req.params);
    res.status(200).json({
      status: "success",
      message: "Delete Paymnet Succesfully",
      data: upload,
    });
  } catch (error) {
    throw new CustomAPIError(`Error: ${error.message}`, 500);
  }
};

module.exports = {
  getAllUploads,
  getOneUploads,
  newUploads,
  updateUpload,
  deleteUpload,
};
