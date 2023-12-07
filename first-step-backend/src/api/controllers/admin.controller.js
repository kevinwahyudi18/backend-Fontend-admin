const { loginAdmin, postAdmin, putAdmin, destroyAdmin } = require("../services/admin.service");

const login = async (req, res) => {
  const result = await loginAdmin(req.body);
  return res.json({
    status: "success",
    message: "Admin credential matched! Here is your token",
    data: result,
  });
};

const createAdmin = async (req, res) => {
  const result = await postAdmin(req.body);
  const { id, username, email, address } = result;

  return res.status(201).json({
    status: "success",
    message: "Admin is created",
    data: { id, username, email, address },
  });
};

const updateAdmin = async (req, res) => {
    const result = await putAdmin(req.params, req.body);
    const { id, username, email, password, address } = result;
    return res.json({
        status: "success",
        message: `Admin Id ${result.id} is updated`,
        data: { id, username, email, password, address },
    });
};

const deleteAdmin = async (req, res) => {
    const result = await destroyAdmin(req.params);

    return res.json({
        status: "success",
        message: `Admin Id ${result.id} is deleted`,
        data: result,
    });
};

module.exports = {
    login,
    createAdmin,
    updateAdmin,
    deleteAdmin
};
