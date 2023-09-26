const isUserAuthorized = require("./authMiddlewares/isUserAuthorized");
const isUserExists = require("./authMiddlewares/isUserExists");
const isUserHaveRole = require("./authMiddlewares/isUserHaveRole");
const isUserRegistered = require("./authMiddlewares/isUserRegistered");
const isValidToken = require("./authMiddlewares/isValidToken");
const AddRoleValidation = require("./bodyValidations/AddRoleValidation");
const LoginValidation = require("./bodyValidations/LoginValidation");
const RefreshValidation = require("./bodyValidations/RefreshValidation");
const RegisterValidation = require("./bodyValidations/RegisterValidation");

module.exports = {
  AddRoleValidation,
  LoginValidation,
  RefreshValidation,
  RegisterValidation,
  isUserAuthorized,
  isUserExists,
  isUserHaveRole,
  isUserRegistered,
  isValidToken,
};
