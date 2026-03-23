const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

exports.generateSummary = async (req, res) => {
  try {
    const { title, author } = req.body;

    if (!title || !author) {
      return res.status(400).json({ error: "Title and author are required" });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "GEMINI_API_KEY missing in .env" });
    }

    const prompt = `Write a clean, concise bookstore-style summary in 80 to 120 words for the book "${title}" by ${author}. Keep it simple, natural, and readable. No bullet points.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const summary = response.text?.trim();

    if (!summary) {
      return res.status(500).json({ error: "No summary returned from Gemini" });
    }

    res.json({ summary, source: "gemini" });
  } catch (error) {
    console.log("GEMINI ERROR:", error);
    res.status(500).json({
      error: error.message || "Gemini request failed",
    });
  }
};