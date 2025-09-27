const express = require("express");
const { addressControllers } = require("../../controllers");
const { VerifyUserToken, RoleAuthorization } = require("../../middlewares");

const router = express.Router();

router.post(
  "/",
  VerifyUserToken,
  RoleAuthorization("admin"),
  addressControllers.createAddress
);

module.exports = router;
