const express = require("express");
const { adminControllers } = require("../../controllers");

const router = express.Router();

router.post("/", adminControllers.createAdmin);

router.get("/", adminControllers.getAllAdmin);

router.get("/:id", adminControllers.findOneAdmin);

router.delete("/:id", adminControllers.deleteAdmin);

module.exports = router;