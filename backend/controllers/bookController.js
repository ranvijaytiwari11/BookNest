const Book = require("../models/Book");

// Get logged-in user's books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    console.log("GET BOOKS ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// Add new book
exports.addBook = async (req, res) => {
  try {
    const { title, author, price, genre, image, summary } = req.body;

    const newBook = new Book({
      title,
      author,
      price,
      genre,
      image,
      summary,
      user: req.user._id,
    });

    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    console.log("ADD BOOK ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// UPDATE BOOK — direct by id
exports.updateBook = async (req, res) => {
  try {
    const { title, author, price, genre, image, summary } = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title,
        author,
        price,
        genre,
        image,
        summary,
      },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(updatedBook);
  } catch (err) {
    console.log("UPDATE BOOK ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// Delete book
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id, user: req.user._id });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    await Book.deleteOne({ _id: req.params.id });
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    console.log("DELETE BOOK ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};