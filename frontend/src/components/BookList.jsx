function BookList({ books, onDelete, onEdit }) {
  return (
    <div className="book-list">
      <h2>All Books</h2>

      {books.length === 0 ? (
        <div className="empty-state">
          <p>No books found 📭</p>
          <span>Add your first book to build your collection.</span>
        </div>
      ) : (
        books.map((book) => (
          <div className="book-card" key={book._id}>
            <div className="book-card-top">
              <div>
                <h3>{book.title}</h3>
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