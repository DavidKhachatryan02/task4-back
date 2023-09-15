const express = require("express");
const cors = require("cors");
const { errorHandler } = require("./errors");

const authRouter = require("./routes/authRoutes");
const productsRouter = require("./routes/productRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/products", productsRouter);

app.use(errorHandler);

module.exports = app;
