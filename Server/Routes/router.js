const express = require("express");
const { addNumber, verifyNumber } = require("../Controller/userController");

const router = express.Router();

router.route("/").post(addNumber);

router.route("/verify-otp").post(verifyNumber);

module.exports = router;
