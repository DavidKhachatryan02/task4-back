const express = require("express");
const productsController = require("../controllers/products.controller");
const {
  ProductValidation,
} = require("../middlewares/products/bodyValidations/ProductValidation");
const {
  DeleteItemValidation,
} = require("../middlewares/products/bodyValidations/DeleteItemValidation");
const {
  EditProductValidation,
} = require("../middlewares/products/bodyValidations/EditProductValidation");

const { isUserAdmin } = require("../middlewares/products/isUserAdmin");
const { isUserAuthorized } = require("../middlewares/auth/isUserAuthorized");

const productsRouter = express.Router();

productsRouter.post(
  "/addProduct",
  ProductValidation,
  isUserAuthorized,
  isUserAdmin,
  productsController.addProduct
);

productsRouter.post(
  "/editProduct",
  EditProductValidation,
  isUserAuthorized,
  isUserAdmin,
  productsController.editProduct
);

productsRouter.post(
  "/deleteProduct",
  DeleteItemValidation,
  isUserAuthorized,
  isUserAdmin,
  productsController.deleteProduct
);

productsRouter.post("/addToCard", productsController.addToCard);

productsRouter.post("/removeProduct", productsController.removeProduct);

productsRouter.post("/addImg", productsController.addImg);

productsRouter.get("/getAllProducts", productsController.getAllProducts);

productsRouter.get("/getProductInfo", productsController.getProductInfo);

productsRouter.get("/getUserCard", productsController.getUserCard);

module.exports = productsRouter;
