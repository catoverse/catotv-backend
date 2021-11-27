import express from "express";
import NodeCache from "node-cache";
import FeedController from "../controllers/feed.controller";
declare global {
  namespace Express {
    interface Request {
      cache: NodeCache;
    }
  }
}
export class FeedRoutes {
  app: express.Application;
  cache: NodeCache;

  constructor(app: express.Application, cache: NodeCache) {
    this.cache = cache;
    this.app = app;
    this.configureRoutes();
  }

  private configureRoutes() {
    this.app.use((req, _, next) => {
      req.cache = this.cache;
      next();
    });
    this.app.route("/feed").get(FeedController.getFeed);
  }
}
