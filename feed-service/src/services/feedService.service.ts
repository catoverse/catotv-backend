import NodeCache from "node-cache";
import { FeedHandler } from "../common/interfaces/feedHandler.interface";
import { VideoDto } from "../dtos/video.dto";

import fetchProfileData from "../lib/fetchProfileData";
import fetchVideos from "../lib/fetchVideos";

export class FeedService implements FeedHandler {
  userId: string = "";
  authToken: string = "";
  selectedTopics: string[] = [];
  watchedVideos: string[] = [];
  videos: VideoDto[] = [];
  cache: NodeCache;

  constructor(cache: NodeCache, userId: string, authToken: string) {
    this.cache = cache;
    this.userId = userId;
    this.authToken = authToken;
  }

  public async getFeed(limit: number): Promise<VideoDto[]> {
    const retrieved: number | undefined = this.cache.get(this.userId);
    const skipVal = retrieved ? retrieved : 0;
    let videos = await this.getVids(this.selectedTopics, skipVal, limit);

    if (videos.length < 1) {
      this.cache.set(this.userId, 0);
      videos = await this.getVids(this.selectedTopics, 0, limit);
    }

    const filteredVideos = videos.filter(
      (vid) => !this.watchedVideos.includes(vid.id)
    );

    // update the cache for this user
    // by adding the length of this feed video array
    const sz: number | undefined = this.cache.take(this.userId);
    const oldSize = sz ? sz : 0;
    const newSize = oldSize + filteredVideos.length;
    this.cache.set(this.userId, newSize);

    return filteredVideos;
  }

  private async getVids(
    topics: String[],
    skip: Number,
    limit: Number
  ): Promise<VideoDto[]> {
    return await fetchVideos(topics, skip, limit, this.authToken);
  }

  public async setProfileData() {
    const profileData = await fetchProfileData(this.userId, this.authToken);

    this.selectedTopics = profileData.selectedTopics;
    this.watchedVideos = profileData.watchedVideos;
  }
}
