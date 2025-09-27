const express = require("express");
const { studentContollers } = require("../../controllers");
const { VerifyUserToken, RoleAuthorization } = require("../../middlewares");

const router = express.Router();

router.post(
  "/",
  VerifyUserToken,
  RoleAuthorization("admin"),
  studentContollers.createStudent
);

router.get(
  "/",
  VerifyUserToken,
   RoleAuthorization("student", "admin", "teacher"),
  studentContollers.getAllStudent
);

router.get(
  "/:id",
  VerifyUserToken,
  RoleAuthorization("student", "admin", "teacher"),
  studentContollers.findOneStudents
);

module.exports = router;
