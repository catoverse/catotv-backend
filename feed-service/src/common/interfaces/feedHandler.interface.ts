import NodeCache from "node-cache";
import { VideoDto } from "../../dtos/video.dto";

export interface FeedHandler {
  userId: string;
  selectedTopics: string[];
  watchedVideos: string[];
  videos: VideoDto[];
  cache: NodeCache;

  getFeed(skip: Number, limit: Number): Promise<VideoDto[]>;
}
