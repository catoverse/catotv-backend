interface TopicCount {
  topic: string;
  count: number;
}

interface WatchedVideo {
  videoId: string;
  topicId: string;
  channelId: string;
}

export interface UserProfile {
  name: string;
  userId: string;
  selectedTopics: string[];
  bookmarks: string[];
  totalWatchTime: number;
  videosWatchedPerTopic: TopicCount[];
  watchedVideos: WatchedVideo[];
}
