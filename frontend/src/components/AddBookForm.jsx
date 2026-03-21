import { useEffect, useState } from "react";
import axios from "axios";

function AddBookForm({ onAddBook, editBook, onCancelEdit }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    genre: "",
    image: "",
    summary: "",
  });

  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    if (editBook) {
      setFormData({
        title: editBook.title || "",
        author: editBook.author || "",
        price: editBook.price || "",
        genre: editBook.genre || "",
        image: editBook.image || "",
        summary: editBook.summary || "",
      });
    } else {
      setFormData({
        title: "",
        author: "",
        price: "",
        genre: "",
        image: "",
        summary: "",
      });
    }
  }, [editBook]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerateSummary = async () => {
    if (!formData.title || !formData.author) {
      alert("Pehle title aur author bhar do");
      return;
    }

    try {
      setAiLoading(true);

      const res = await axios.post("http://localhost:5000/api/ai/summary", {
        title: formData.title,
        author: formData.author,
      });

      setFormData((prev) => ({
        ...prev,
        summary: res.data.summary,
      }));
    } catch (error) {
      console.log("AI summary error:", error);
      alert("AI summary generate nahi hui");
    } finally {
      setAiLoading(false);
    }
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

      <textarea
        name="summary"
        placeholder="AI generated summary"
        value={formData.summary}
        onChange={handleChange}
        rows="4"
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "12px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxSizing: "border-box",
          resize: "vertical",
        }}
      />

      <div className="form-actions">
        <button
          type="button"
          className="secondary-btn"
          onClick={handleGenerateSummary}
        >
          {aiLoading ? "Generating..." : "Generate AI Summary"}
        </button>

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