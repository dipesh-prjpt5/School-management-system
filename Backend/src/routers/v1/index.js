const express = require("express");

const studentRouter = require("./Student.route.js");
const teacherRouter = require("./Teacher.route.js");
const adminRouter = require("./Admin.route.js");
const userRouter = require("./User.route.js");
const roleRouter = require("./Role.route.js");
const addressRouter = require("./Address.route.js");

const router = express.Router();

router.use("/user", userRouter);

router.use("/admin", adminRouter);

router.use("/student", studentRouter);

router.use("/teacher", teacherRouter);

router.use("/role", roleRouter);

router.use("/address", addressRouter);

module.exports = router;
