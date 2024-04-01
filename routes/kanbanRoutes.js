const express = require("express");
const router = express.Router();
const fs = require("fs");

// Path: routes/kanbanRoute.js
// read the data from the file
const kanbanData = fs.readFileSync("./data/kanbanData.json", "utf8");

// parse the data into a JSON object
const kanbanArray = JSON.parse(kanbanData);

// GET all tickets
router.get("/", (req, res) => {
  res.json(kanbanArray);
});

// POST a new ticket
router.post("/", (req, res) => {
  const newTicket = req.body;
  console.log(newTicket);
  kanbanArray.push(newTicket);
  fs.writeFileSync(
    "./data/kanbanData.json",
    JSON.stringify(kanbanArray, null, 2)
  );

  //   return the new ticket
  res.json(newTicket);
});

// PUT (update) a ticket
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const updatedTicket = req.body;
  kanbanArray[id] = updatedTicket;
  fs.writeFileSync(
    "./data/kanbanData.json",
    JSON.stringify(kanbanArray, null, 2)
  );

  //   return the updated ticket
  res.json(updatedTicket);
});

// DELETE a ticket
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  kanbanArray.splice(id, 1);
  fs.writeFileSync(
    "./data/kanbanData.json",
    JSON.stringify(kanbanArray, null, 2)
  );

  //   return the updated array
  res.json(kanbanArray);
});

module.exports = router;
