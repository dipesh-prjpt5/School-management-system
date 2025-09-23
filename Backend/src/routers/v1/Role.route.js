const express = require("express");
const { roleControllers } = require("../../controllers");

const router = express.Router();

router.post("/", roleControllers.createRole);

module.exports = router;
