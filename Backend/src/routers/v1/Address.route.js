const express = require("express");
const { addressControllers } = require("../../controllers");

const router = express.Router();

router.post("/", addressControllers.createAddress);

module.exports = router;