const express = require("express");

const router = express.Router();

const { authControllers } = require("../../controllers");

router.post("/login", authControllers.handleUserLogin);

router.post("/log-out", authControllers.handleUserLogOut);

module.exports = router;
