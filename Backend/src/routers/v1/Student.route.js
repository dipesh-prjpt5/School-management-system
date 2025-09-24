const express = require("express");
const { studentContollers } = require("../../controllers");

const router = express.Router();

router.post("/", studentContollers.createStudent);

router.get("/", studentContollers.getAllStudent);

router.get("/:id", studentContollers.findOneStudents);

module.exports = router;
