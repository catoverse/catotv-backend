require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");

import express, { Application, Response } from "express";
import { FeedRoutes } from "./routes/feed.routes";

import NodeCache from "node-cache";
const cache = new NodeCache();

const app: Application = express();
const port = process.env.PORT || 4000;

//Express options
app.use(morgan(process.env.NODE_ENV == "production" ? "common" : "dev"));
app.use(express.json());

//CORS
app.use(cors());

//Express Routes
new FeedRoutes(app, cache);

app.get("/", async (_, res: Response) =>
  res.status(200).send({ Health: "OK." })
);
try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error: any) {
  console.error(`Error occured: ${error.message}`);
}
