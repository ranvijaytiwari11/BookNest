const express = require("express");
const router = express.Router();
const { generateSummary } = require("../controllers/aicontrollers");

router.post("/summary", generateSummary);

module.exports = router;