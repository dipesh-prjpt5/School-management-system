const express = require("express");
const { adminControllers } = require("../../controllers");
const { VerifyUserToken, RoleAuthorization } = require("../../middlewares");

const router = express.Router();

router.post(
  "/",
  VerifyUserToken,
  RoleAuthorization("admin"),
  adminControllers.createAdmin
);

router.get(
  "/",
  VerifyUserToken,
  RoleAuthorization("admin"),
  adminControllers.getAllAdmin
);

router.get(
  "/:id",
  VerifyUserToken,
  RoleAuthorization("admin"),
  adminControllers.findOneAdmin
);

router.delete(
  "/:id",
  VerifyUserToken,
  RoleAuthorization("admin"),
  adminControllers.deleteAdmin
);

module.exports = router;
