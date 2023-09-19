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
const {
  AddToCardValidation,
} = require("../middlewares/products/bodyValidations/AddToCardValidation");
const {
  AddImgValidation,
} = require("../middlewares/products/bodyValidations/AddImgValidation");
const {
  RemoveImgValidation,
} = require("../middlewares/products/bodyValidations/RemoveImgValidation");

const { isUserAdmin } = require("../middlewares/products/isUserAdmin");
const { isUserCustomer } = require("../middlewares/products/isUserCustomer");
const { isUserAuthorized } = require("../middlewares/auth/isUserAuthorized");
const { isImgAdded } = require("../middlewares/products/isImgAdded");
const { isImgExists } = require("../middlewares/products/isImgExists");

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

productsRouter.post(
  "/addImg",
  AddImgValidation,
  isImgAdded,
  isUserAuthorized,
  isUserAdmin,
  productsController.addImg
);

productsRouter.post(
  "/removeImg",
  RemoveImgValidation,
  isImgExists,
  isUserAuthorized,
  isUserAdmin,
  productsController.removeImg
);

productsRouter.get(
  "/getAllProducts",
  isUserAuthorized,
  productsController.getAllProducts
);

productsRouter.get(
  "/getProductInfo",
  isUserAuthorized,
  productsController.getProductInfo
);

productsRouter.post(
  "/addToCard",
  AddToCardValidation,
  isUserAuthorized,
  isUserCustomer,
  productsController.addToCard
);

productsRouter.post(
  "/removeProductFromCard",
  AddToCardValidation,
  isUserAuthorized,
  isUserCustomer,
  productsController.removeProductFromCard
);

productsRouter.get(
  "/getUserCard",
  isUserAuthorized,
  isUserCustomer,
  productsController.getUserCard
);

module.exports = productsRouter;
