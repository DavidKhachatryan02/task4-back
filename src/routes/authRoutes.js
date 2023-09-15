const express = require("express");
const authController = require("../controllers/auth.controller");
const {
  LoginValidation,
} = require("../middlewares/auth/bodyValidations/LoginValidation");
const {
  AddRoleValidation,
} = require("../middlewares/auth/bodyValidations/AddRoleValidation");
const {
  RefreshValidation,
} = require("../middlewares/auth/bodyValidations/RefreshValidation");
const {
  RegisterValidation,
} = require("../middlewares/auth/bodyValidations/RegisterValidation");
const { isUserAuthorized } = require("../middlewares/auth/isUserAuthorized");
const { isUserExists } = require("../middlewares/auth/isUserExists");
const { isValidToken } = require("../middlewares/auth/isValidToken");
const { isUserRegistered } = require("../middlewares/auth/isUserRegistered");

const { isUserHaveRole } = require("../middlewares/auth/isUserHaveRole");

const authRouter = express.Router();

authRouter.get("/getMe", isUserAuthorized, authController.getMe);

authRouter.post("/login", LoginValidation, isUserExists, authController.login);

authRouter.post(
  "/register",
  RegisterValidation,
  isUserRegistered,
  authController.register
);

authRouter.post(
  "/refreshToken",
  RefreshValidation,
  isValidToken,
  authController.refreshToken
);

authRouter.post("/logout", authController.logout);

authRouter.post(
  "/addRoleToUser",
  AddRoleValidation,
  isUserHaveRole,
  authController.addRoleToUser
);

module.exports = authRouter;
