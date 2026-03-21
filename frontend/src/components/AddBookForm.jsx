import { useState, useEffect } from "react";

function AddBookForm({ onAddBook, editBook }) {
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

    setFormData({
      title: "",
      author: "",
      price: "",
      genre: "",
      image: "",
    });
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

      <button type="submit">
        {editBook ? "Update Book" : "Add Book"}
      </button>
    </form>
  );
}

export default AddBookForm;