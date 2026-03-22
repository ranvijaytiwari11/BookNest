exports.generateSummary = async (req, res) => {
  try {
    const { title, author } = req.body;

    if (!title || !author) {
      return res.status(400).json({ error: "Title and author are required" });
    }

    const summary = `${title} by ${author} is an engaging and informative book that helps readers understand its central ideas in a simple way. It is suitable for readers who want clarity, knowledge, and a quick overview of the subject. This book can be useful for both beginners and interested learners who want to explore the topic in an easy and meaningful manner.`;

    res.json({ summary });
  } catch (error) {
    console.error("AI SUMMARY ERROR:", error);
    res.status(500).json({ error: "AI summary failed" });
  }
};