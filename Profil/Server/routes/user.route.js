/* eslint-disable quotes */
const express = require("express");

const router = express.Router();
const userController = require("../controller/user.controller");

router.get("/users", userController.findAll);
router.get("/users/:id", userController.findOne);
router.put("/updateData", userController.update);

module.exports = router;
