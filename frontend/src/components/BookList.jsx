import { useState, useEffect } from "react";

function BookList({ books, onDelete, onEdit }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(savedFavorites);
  }, []);

  const toggleFavorite = (id) => {
    let updatedFavorites = [];

    if (favorites.includes(id)) {
      updatedFavorites = favorites.filter((favId) => favId !== id);
    } else {
      updatedFavorites = [...favorites, id];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="book-list">
      <h2>All Books</h2>

      {books.length === 0 ? (
        <div className="empty-state">
          <p>No books found 📭</p>
          <span>Add your first book to start your collection.</span>
        </div>
      ) : (
        books.map((book) => (
          <div className="book-card" key={book._id}>
            <div className="book-card-top">
              <div className="book-card-content">
                <h3>
                  {book.title}
                  <span
                    className="fav-icon"
                    onClick={() => toggleFavorite(book._id)}
                    title="Toggle Favorite"
                  >
                    {favorites.includes(book._id) ? "⭐" : "☆"}
                  </span>
                </h3>

                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Price:</strong> ₹{book.price}</p>
                <p><strong>Genre:</strong> {book.genre || "General"}</p>
              </div>

              {book.image && (
                <img
                  src={book.image}
                  alt={book.title}
                  className="book-image"
                />
              )}
            </div>

            {book.summary && (
              <p className="summary-text">
                <strong>Summary:</strong> {book.summary}
              </p>
            )}

            <div className="book-actions">
              <button className="edit-btn" onClick={() => onEdit(book)}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => onDelete(book._id)}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default BookList;