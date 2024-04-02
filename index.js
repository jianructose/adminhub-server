const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet"); // Helmet helps you secure your Express apps by setting various HTTP headers.
const eventRoutes = require("./routes/eventRoutes");
const kanbanRoutes = require("./routes/kanbanRoutes");

require("dotenv").config(); // load environment variables from .env file
const { PORT } = process.env || 8080;

// Middleware
app.use(cors());
app.use(express.json()); // parse requests of content-type - application/json

app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/events", eventRoutes);
app.use("/api/kanban", kanbanRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
