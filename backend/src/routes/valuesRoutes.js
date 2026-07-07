const express = require("express");
const { addValue, getAllValues } = require("../controllers/valuesController");

const router = express.Router();

router.get("/all", getAllValues);
router.post("/", addValue);

module.exports = router;
