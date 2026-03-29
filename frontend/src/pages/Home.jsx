import { useEffect, useState } from "react";
import axios from "axios";
import AddBookForm from "../components/AddBookForm";
import BookList from "../components/BookList";

function Home() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [editBook, setEditBook] = useState(null);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const authConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchBooks = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/books`, authConfig);
      setBooks(res.data);
    } catch (error) {
      console.log("Error fetching books:", error.response?.data || error.message);
    }
  };

  const addBook = async (bookData) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/books`,
        {
          ...bookData,
          price: Number(bookData.price),
        },
        authConfig
      );

      setMessage("Book added successfully");
      setEditBook(null);
      fetchBooks();
      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      console.log("Error adding book:", error.response?.data || error.message);
      alert("Book add nahi hui");
    }
  };

  const updateBook = async (bookData) => {
    try {
      const bookId = editBook?._id;
      if (!bookId) {
        alert("Book id missing");
        return;
      }

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/books/${bookId}`,
        {
          ...bookData,
          price: Number(bookData.price),
        },
        authConfig
      );

      setMessage("Book updated successfully");
      setEditBook(null);
      fetchBooks();
      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      console.log("Error updating book:", error.response?.data || error.message);
      alert("Book update nahi hui");
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/books/${id}`, authConfig);
      setMessage("Book deleted successfully");
      fetchBooks();
      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      console.log("Error deleting book:", error.response?.data || error.message);
      alert("Book delete nahi hui");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-wrapper">
      <div className="hero-section">
        <h1>📚 BookNest Store</h1>
        <p className="author-text">Author: Ranvijay Tiwari</p>
        <p className="hero-subtext">
          {user
            ? `Welcome back, ${user.name}! Manage your personal book collection here.`
            : "Manage your personal book collection here."}
        </p>
      </div>

      <div className="app">
        <input
          className="search-box"
          type="text"
          placeholder="Search books by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {message && <p className="success-text">{message}</p>}

        <AddBookForm
          onAddBook={editBook ? updateBook : addBook}
          editBook={editBook}
          onCancelEdit={() => setEditBook(null)}
        />

        <BookList
          books={filteredBooks}
          onDelete={deleteBook}
          onEdit={setEditBook}
        />

        <footer className="footer">
          <p>BookNest • MERN Stack Project • Ranvijay Tiwari</p>
        </footer>
      </div>
    </div>
  );
}

export default Home;