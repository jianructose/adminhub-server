const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const helmet = require("helmet"); // Helmet helps you secure your Express apps by setting various HTTP headers.
const eventRoutes = require("./routes/eventRoutes");

require("dotenv").config(); // load environment variables from .env file
const { PORT, HOST } = process.env || 3000;
// Middleware
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/kanban", require("./routes/kanbanRoutes"));

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
