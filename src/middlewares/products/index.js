const AddImgValidation = require("./bodyValidations/AddImgValidation");
const DeleteItemValidation = require("./bodyValidations/DeleteItemValidation");
const EditProductValidation = require("./bodyValidations/EditProductValidation");
const ProductValidation = require("./bodyValidations/ProductValidation");
const AddToCardValidation = require("./bodyValidations/AddToCardValidation");
const RemoveImgValidation = require("./bodyValidations/RemoveImgValidation");
const isImgAdded = require("./productMiddlewares/isImgAdded");
const isImgExists = require("./productMiddlewares/isImgExists");
const isUserAdmin = require("./productMiddlewares/isUserAdmin");
const isUserCustomer = require("./productMiddlewares/isUserCustomer");

module.exports = {
  AddToCardValidation,
  AddImgValidation,
  DeleteItemValidation,
  EditProductValidation,
  ProductValidation,
  RemoveImgValidation,
  isImgAdded,
  isImgExists,
  isUserAdmin,
  isUserCustomer,
};
