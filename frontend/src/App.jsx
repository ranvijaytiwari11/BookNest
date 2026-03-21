import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import BookList from "./components/BookList";
import AddBookForm from "./components/AddBookForm";

function App() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [editBook, setEditBook] = useState(null);

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/books");
      setBooks(res.data);
    } catch (error) {
      console.log("Error fetching books:", error);
    }
  };

  const addBook = async (bookData) => {
    try {
      await axios.post("http://localhost:5000/api/books", {
        ...bookData,
        price: Number(bookData.price),
      });
      fetchBooks();
    } catch (error) {
      console.log("Error adding book:", error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.log("Error deleting book:", error);
    }
  };

  const updateBook = async (bookData) => {
    try {
      await axios.put(`http://localhost:5000/api/books/${editBook._id}`, {
        ...bookData,
        price: Number(bookData.price),
      });
      setEditBook(null);
      fetchBooks();
    } catch (error) {
      console.log("Error updating book:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <h1>📚 BookNest Store</h1>
      <p className="author-text">Author: Ranvijay Tiwari</p>

      <input
        className="search-box"
        type="text"
        placeholder="Search books by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <AddBookForm
        onAddBook={editBook ? updateBook : addBook}
        editBook={editBook}
      />

      <BookList
        books={filteredBooks}
        onDelete={deleteBook}
        onEdit={setEditBook}
      />
    </div>
  );
}

export default App;