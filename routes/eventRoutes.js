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
    const { Id, Subject, Location, StartTime, EndTime } = req.body;

    if (Subject && StartTime && EndTime && typeof Id === "number") {
      const newEvent = {
        Id: Id,
        Subject: Subject,
        StartTime: StartTime,
        EndTime: EndTime,
        Location: Location,
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
router.put("/", (req, res) => {
  try {
    const { Id, Subject, Location, StartTime, EndTime } = req.body;
    console.log(`request body id found when updating: ${Id}`);

    if (Subject && StartTime && EndTime && typeof Id === "number") {
      const eventIndex = scheduleArray.findIndex((event) => event.Id === Id);
      // return the index of the event in the scheduleArray

      if (eventIndex !== -1) {
        scheduleArray[eventIndex] = {
          Id: Id,
          Subject: Subject,
          StartTime: StartTime,
          EndTime: EndTime,
          Location: Location,
        };

        // write the updated scheduleArray to the file
        fs.writeFileSync(
          "./data/scheduleData.json",
          JSON.stringify(scheduleArray, null, 2)
        );

        // send the updated scheduleArray back to the client
        res.json(scheduleArray);
      } else {
        res.status(404).json({ message: "Oh no! Event not found." });
      }
    } else {
      res.status(400).json({
        message: "Invalid event data. Please provide required fields.",
      });
    }
  } catch (error) {
    console.log("error occured while updating event", error.message);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});
// event data in scheduleData.json
//    {
//   "Id": 34,
//   "Subject": "edit-demo day!",
//   "StartTime": "2024-04-04T07:00:00.000Z",
//   "EndTime": "2024-04-05T07:00:00.000Z"
// }
// DELETE an event
router.delete("/", (req, res) => {
  try {
    const { Id } = req.body;
    console.log(`request body found when deleting: ${Id}`);

    if (Id) {
      // find the event with the given Id
      const eventIndex = scheduleArray.findIndex((event) => event.Id === Id);

      if (eventIndex !== -1) {
        // delete the event from the scheduleArray
        scheduleArray.splice(eventIndex, 1);

        // write the updated scheduleArray to the file
        fs.writeFileSync(
          "./data/scheduleData.json",
          JSON.stringify(scheduleArray, null, 2)
        );

        // send the updated scheduleArray back to the client
        res.json(scheduleArray);
      } else {
        res.status(404).json({ message: "Oh no! Event not found." });
      }
    } else {
      res
        .status(400)
        .json({ message: "Invalid event Id. Please provide a number." });
    }
  } catch (error) {
    console.log("error occured while deleting event", error.message);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});
module.exports = router;
