import { Request, Response } from "express";
import { FeedService } from "../services/feedService.service";

class FeedController {
  async getFeed(req: Request, res: Response) {
    try {
      const userId = String(req.query.userId);
      const feedService = new FeedService(
        req.cache,
        userId,
        String(req.headers["x-auth-token"])
      );

      await feedService.setProfileData();

      const videoFeed = await feedService.getFeed(Number(req.query.limit));

      res.status(200).send(videoFeed);
    } catch (error: any) {
      console.log(error);
      res.status(500).send({ error: error.message });
    }
  }
}

export default new FeedController();
