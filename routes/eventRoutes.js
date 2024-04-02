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
    const {
      Id,
      Subject,
      StartTime,
      EndTime,
      Description,
      IsAllDay,
      Location,
      RecurrenceRule,
      StartTimezone,
      EndTimezone,
    } = req.body;

    if (Subject && StartTime && EndTime && typeof Id === "number") {
      const newEvent = {
        Id: Id,
        Subject: Subject,
        StartTime: StartTime,
        EndTime: EndTime,
        Description: Description,
        IsAllDay: IsAllDay || false,
        Location: Location,
        RecurrenceRule: RecurrenceRule,
        StartTimezone: StartTimezone,
        EndTimezone: EndTimezone,
      };

      scheduleArray.push(newEvent);

      // write the updated scheduleArray to the file
      fs.writeFileSync(
        "./data/scheduleData.json",
        JSON.stringify(scheduleArray, null, 2)
      );

      // send the updated scheduleArray back to the client
      res.status(201).json(scheduleArray);
    } else {
      res.status(400).json({
        message: "Invalid event data. Please provide required fields.",
      });
    }
  } catch (error) {
    console.log("error occured while adding event", error.message);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

// PUT (update) an event
router.put("/:id", (req, res) => {
  console.log("PUT request received", req.body);
});

// DELETE an event
router.delete("/:id", (req, res) => {
  console.log("DELETE request received", req.body.Id);
});
module.exports = router;
