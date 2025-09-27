const express = require("express");
const { roleControllers } = require("../../controllers");
const { VerifyUserToken, RoleAuthorization } = require("../../middlewares");

const router = express.Router();

router.post(
  "/",
  VerifyUserToken,
  RoleAuthorization("admin"),
  roleControllers.createRole
);

router.get(
  "/",
  VerifyUserToken,
  RoleAuthorization("admin"),
  roleControllers.getAllRoles
);

module.exports = router;
