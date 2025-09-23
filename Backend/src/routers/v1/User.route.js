const express = require("express");
const { userContollers } = require("../../controllers");

const router = express.Router();

router.post("/", userContollers.createUser);

router.get("/", userContollers.getallUsers);

module.exports = router;
