const express = require("express");
const { userContollers } = require("../../controllers");

const router = express.Router();

router.post("/", userContollers.createUser);

router.get("/", userContollers.getallUsers);

router.get("/:id", userContollers.getOneUser);

router.delete("/:id", userContollers.deleteUser);

module.exports = router;
