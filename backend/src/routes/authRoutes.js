const express = require("express");

const { createAccount } = require("../controllers/authController");

const router = express.Router();

router.post("/create-account", createAccount);

module.exports = router;