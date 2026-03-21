import { useEffect, useState } from "react";

function AddBookForm({ onAddBook, editBook, onCancelEdit }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    genre: "",
    image: "",
  });

  useEffect(() => {
    if (editBook) {
      setFormData({
        title: editBook.title || "",
        author: editBook.author || "",
        price: editBook.price || "",
        genre: editBook.genre || "",
        image: editBook.image || "",
      });
    } else {
      setFormData({
        title: "",
        author: "",
        price: "",
        genre: "",
        image: "",
      });
    }
  }, [editBook]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddBook(formData);
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <h2>{editBook ? "Edit Book" : "Add New Book"}</h2>

      <input
        type="text"
        name="title"
        placeholder="Book Title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="author"
        placeholder="Author Name"
        value={formData.author}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="genre"
        placeholder="Genre"
        value={formData.genre}
        onChange={handleChange}
      />

      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
      />

      <div className="form-actions">
        <button className="primary-btn" type="submit">
          {editBook ? "Update Book" : "Add Book"}
        </button>

        {editBook && (
          <button
            type="button"
            className="secondary-btn"
            onClick={onCancelEdit}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default AddBookForm;