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
  try {
    console.log("req.body", req.body);

    const addedEvent = req.body.added[0];

    // validate this added event
    if (!addedEvent) {
      throw new Error("No event provided");
    }

    // add the event to the scheduleArray
    scheduleArray.unshift(addedEvent);

    // write the updated scheduleArray to the file
    fs.writeFileSync(
      "./data/scheduleData.json",
      JSON.stringify(scheduleArray, null, 2)
    );

    // send the updated scheduleArray back to the client
    res.status(201).json(scheduleArray);
  } catch (error) {
    console.log("error occured while adding event", error.message);
    res.status(400).json({ message: error.message });
  }
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
