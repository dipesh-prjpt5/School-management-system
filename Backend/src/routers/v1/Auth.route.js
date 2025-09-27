const express = require("express");
const { VerifyUserToken, RoleAuthorization } = require("../../middlewares");
const router = express.Router();

const { authControllers } = require("../../controllers");

router.post("/login", authControllers.loginController);

router.post(
  "/logout",
  VerifyUserToken,
  RoleAuthorization,
  authControllers.logoutController
);

module.exports = router;
