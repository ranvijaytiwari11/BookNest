const express = require("express");
const router = express.Router();
const { generateSummary } = require("../controllers/aiControllers");

router.post("/summary", generateSummary);

module.exports = router;