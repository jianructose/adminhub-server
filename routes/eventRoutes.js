const express = require("express");
const router = express.Router();
const fs = require("fs");

// read the data from the file
const scheduleData = fs.readFileSync("./data/scheduleData.json", "utf8");

// parse the data into a JSON object
const scheduleArray = JSON.parse(scheduleData);

// GET all events
router.get("/", (req, res) => {
  res.json(scheduleArray);
});

// POST a new event
router.post("/", (req, res) => {
  const newEvent = req.body;
  console.log(newEvent);
  scheduleArray.push(newEvent);
  fs.writeFileSync(
    "./data/scheduleData.json",
    JSON.stringify(scheduleArray, null, 2)
  );
  res.json(scheduleArray);
});

// PUT (update) an event
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const updatedEvent = req.body;
  scheduleArray[id] = updatedEvent;
  fs.writeFileSync(
    "./data/scheduleData.json",
    JSON.stringify(scheduleArray, null, 2)
  );
  res.json(scheduleArray);
});

// DELETE an event
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  scheduleArray.splice(id, 1);
  fs.writeFileSync(
    "./data/scheduleData.json",
    JSON.stringify(scheduleArray, null, 2)
  );
  res.json(scheduleArray);
});
module.exports = router;
