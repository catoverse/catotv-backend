const express = require("express");

const events = require("./routes/api/events");

const app = express();

app.use(express.json());

app.use("/api/event", events);

//For all unmatched routes
app.use((_, res) => {
  res.json("Invalid API request", 400);
});

const port = process.env.PORT || 4567;
app.listen(port, () => console.log(`Server started on port ${port}`));
