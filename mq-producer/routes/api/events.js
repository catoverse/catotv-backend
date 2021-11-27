const express = require("express");
const config = require("config");

const { v4: uuidv4 } = require("uuid");

const auth = require("../../middleware/auth.js");

const userEventDestination = "/queue/user";
const videoEventDestination = "/queue/video";

const eventsLogger = require("../../logger");

const router = express.Router();

const stompit = require("stompit");
require("dotenv").config();

const connectOptions = {
  host: process.env.MQ_HOST,
  port: process.env.MQ_PORT,
  connectHeaders: {
    host: "/",
    login: process.env.MQ_USERNAME,
    passcode: process.env.MQ_PASSWORD,
  },
};

router.post("/user", auth, async (req, res) => {
  let events = req.body;

  stompit.connect(connectOptions, (error, client) => {
    if (error) {
      console.log("connection error " + error.message);
      return;
    }
    console.log("Connected to RabbitMQ");

    const sendHeaders = {
      destination: userEventDestination,
      "content-type": "application/json",
    };

    let transaction = client.begin();

    for (let event of events) {
      event["uuid"] = uuidv4();
      let message = JSON.stringify(event);

      transaction.send(sendHeaders).end(message);
    }

    // transaction.commit();

    transaction.commit((err) => {
      if (err) {
        console.error("Error While Disconnecting:", err);
        res.status(500).send({ message: "Error While Commiting to MQ", err });
      }
    });

    console.log("Sent messages");

    client.disconnect((err) => {
      if (err) {
        console.error("Error While Disconnecting:", err);
        res.status(500).send({ message: "Error While Disconnecting", message });
      }
    });

    console.log("Disconnected from RabbitMQ");

    return;
  });
  res.status(200).send({ message: "events successfully written to queue" });
});

router.post("/user-video", auth, (req, res) => {
  let event = req.body;
  event["uuid"] = uuidv4();
  let message = JSON.stringify(req.body);

  stompit.connect(connectOptions, function (error, client) {
    if (error) {
      console.log("connection error " + error.message);
      return;
    }
    console.log("Connected to amazonMQ");

    const sendHeaders = {
      destination: videoEventDestination,
      "content-type": "application/json",
    };

    const frame = client.send(sendHeaders);
    frame.write(message, (err) => {
      if (err) {
        seventsLogger.error("Failed to write an event to the queue: ", {
          event: `${message}`,
        });
        res.json(
          {
            errors: ["Could not write to MQ"],
          },
          500
        );
        return;
      }
    });
    frame.end();
    client.disconnect();
  });

  eventsLogger.info("Recorded event", {
    uuid: event["uuid"],
    type: "user-video",
  });
  res.json(200);
});

module.exports = router;
