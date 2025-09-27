const express = require("express");
const { userContollers } = require("../../controllers");
const { VerifyUserToken, RoleAuthorization } = require("../../middlewares");

const router = express.Router();

router.post(
  "/",
  VerifyUserToken,
  RoleAuthorization("admin"),
  userContollers.createUser
);

router.delete(
  "/:id",
  VerifyUserToken,
  RoleAuthorization("admin"),
  userContollers.deleteUser
);

module.exports = router;
