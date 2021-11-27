import { Field, ObjectType, InputType } from "type-graphql";

@ObjectType()
class TopicCount {
  @Field()
  topic: string;

  @Field()
  count: number;
}
@ObjectType()
class WatchedVideo {
  @Field()
  videoId: string;

  @Field()
  topicId: string;

  @Field()
  channelId: string;
}

@ObjectType()
export class UserProfile {
  @Field()
  name: string;

  @Field()
  userId: string;

  @Field((type) => [String])
  selectedTopics: string[];

  @Field((type) => [String])
  bookmarks: string[];

  @Field()
  totalWatchTime: number;

  @Field((type) => [TopicCount])
  videosWatchedPerTopic: TopicCount[];

  @Field((type) => [WatchedVideo])
  watchedVideos: WatchedVideo[];
}

@InputType()
export class UserProfileInput implements Partial<UserProfile> {
  @Field()
  name: string;

  @Field()
  userId: string;

  @Field((type) => [String])
  selectedTopics: string[];
}

@InputType()
export class WatchedVideoInput {
  @Field()
  videoId: string;

  @Field()
  topicId: string;

  @Field()
  channelId: string;
}
