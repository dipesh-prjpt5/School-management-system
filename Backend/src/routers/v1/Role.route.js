const express = require("express");
const { roleControllers } = require("../../controllers");

const router = express.Router();

router.post("/", roleControllers.createRole);

router.get("/", roleControllers.getAllRoles);

module.exports = router;
