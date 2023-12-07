const CustomAPIError = require("./custom-error");

const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        console.log("error: ", err);
        return res.status(err.statusCode).json({ message: err.message });
    }
    console.log(err);
    return res.status(500).json("Internal Server Error");
};

module.exports = errorHandlerMiddleware;