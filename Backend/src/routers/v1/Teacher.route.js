const express = require("express");
const { teacherControllers } = require("../../controllers");

const router = express.Router();

router.post("/", teacherControllers.createTeacher);

router.get("/", teacherControllers.getAllTeachers);

router.get("/:id", teacherControllers.findOneTeacher);

router.delete("/:id", teacherControllers.deleteTeacher);

module.exports = router;