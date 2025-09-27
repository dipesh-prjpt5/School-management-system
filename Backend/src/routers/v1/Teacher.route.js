const express = require("express");
const { teacherControllers } = require("../../controllers");
const { VerifyUserToken, RoleAuthorization } = require("../../middlewares");

const router = express.Router();

router.post(
  "/",
  VerifyUserToken,
  RoleAuthorization("admin"),
  teacherControllers.createTeacher
);

router.get(
  "/",
  VerifyUserToken,
  RoleAuthorization("admin", "teacher", "student"),
  teacherControllers.getAllTeachers
);

router.get(
  "/:id",
  VerifyUserToken,
  RoleAuthorization("admin", "teacher", "student"),
  teacherControllers.findOneTeacher
);

module.exports = router;
