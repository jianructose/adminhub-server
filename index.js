// express server
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config(); // load environment variables from .env file
const { PORT, HOST } = process.env; // get port and host from environment variables

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/event", require("./routes/api/eventRoutes"));
app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
