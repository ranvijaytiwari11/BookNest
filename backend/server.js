const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bookRoutes = require("./routes/bookRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/booknest")
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("BookNest API Running");
});

app.use("/api/books", bookRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});