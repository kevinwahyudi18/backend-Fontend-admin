const express = require("express");
const cors = require("cors");

require("express-async-errors");
const routes = require("./routes");
const errorHandlerMiddleware = require("./api/middlewares/error");
const notFound = require("./api/middlewares/not-found");

const app = express();

/**
 * middleware
 */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));
/**
 * routes
 */
app.use(routes);
app.use(notFound);
app.use(errorHandlerMiddleware);
module.exports = app;