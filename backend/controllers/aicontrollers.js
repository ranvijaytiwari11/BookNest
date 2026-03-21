exports.generateSummary = async (req, res) => {
  try {
    const { title, author } = req.body;

    if (!title || !author) {
      return res.status(400).json({ error: "Title and author are required" });
    }

    const summary = `${title} by ${author} is a thoughtful and engaging book. It introduces the reader to the core ideas, background, and importance of the subject in a simple and accessible way. This book is useful for readers who want a quick understanding of the topic and want to explore its practical and deeper meaning.`;

    res.json({ summary });
  } catch (error) {
    console.error("AI SUMMARY ERROR:", error);
    res.status(500).json({ error: "AI summary failed" });
  }
};