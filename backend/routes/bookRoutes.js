const express = require("express");
const router = express.Router();

const {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getBooks);
router.post("/", protect, addBook);

// TEMP STABLE FIX FOR UPDATE
router.put("/:id", updateBook);

router.delete("/:id", protect, deleteBook);

module.exports = router;