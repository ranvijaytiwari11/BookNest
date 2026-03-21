function BookList({ books, onDelete, onEdit }) {
  return (
    <div className="book-list">
      <h2>All Books</h2>

      {books.length === 0 ? (
        <p>No books found 📭</p>
      ) : (
        books.map((book) => (
          <div className="book-card" key={book._id}>
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Price:</strong> ₹{book.price}</p>
            <p><strong>Genre:</strong> {book.genre}</p>

            {book.summary && (
              <p>
                <strong>Summary:</strong> {book.summary}
              </p>
            )}

            {book.image && (
              <img
                src={book.image}
                alt={book.title}
                className="book-image"
              />
            )}

            <div className="book-actions">
              <button
                className="delete-btn"
                onClick={() => onDelete(book._id)}
              >
                Delete
              </button>

              <button
                className="edit-btn"
                onClick={() => onEdit(book)}
              >
                Edit
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default BookList;