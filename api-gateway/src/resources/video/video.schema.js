const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Maxres {
    url: String
    width: Int
    height: Int
  }

  type Standard {
    url: String
    width: Int
    height: Int
  }

  type High {
    url: String
    width: Int
    height: Int
  }

  type Medium {
    url: String
    width: Int
    height: Int
  }

  type Default {
    url: String
    width: Int
    height: Int
  }

  type Thumbnails {
    maxres: Maxres
    standard: Standard
    high: High
    medium: Medium
    default: Default
  }

  type ContentDetails {
    youtube_category: Int
    captions_available: Boolean
    dislikes: Int
    duration: Int
    likes: Int
    views: Int
    thumbnails: Thumbnails
  }

  type CommentsAnalysis {
    comments_available: Boolean
    negative_comments: Int
    negativity_ratio: Float
    positive_comments: Int
    positivity_ratio: Float
    total_comments: Int
  }

  type ChannelInformation {
    id: String
    name: String
    subscriber_count: Int
    thumbnails: Thumbnails
  }

  type Video {
    id: ID!
    title: String
    video_url: String
    topics: [Topic]
    start_timestamp: Int
    end_timestamp: Int
    available: Boolean
    video_id: String
    content_details: ContentDetails
    comments_analysis: CommentsAnalysis
    tags: [String]
    channel_information: ChannelInformation
    source: String
  }

  type TruncatedVideo {
    id: ID!
    source: String
    video_id: String
    title: String
    available: Boolean
    video_url: String
    topics: [Topic]
    start_timestamp: Int
    end_timestamp: Int
    thumbnail_url: String
    channel_name: String
    channel_avatar_url: String
  }

  input VideoInput {
    title: String!
    author_name: String!
    video_url: String!
    topics: [TopicInput!]
    source: Source!
    start_timestamp: Int!
    end_timestamp: Int!
  }

  enum Source {
    YouTube
    TED
  }

  extend type Query {
    videoByTopics(topics: [ID!], skip: Int!, limit: Int!): [Video]!
    truncatedVideoByTopics(
      topics: [ID!]
      skip: Int!
      limit: Int!
    ): [TruncatedVideo]!
    allVideo(skip: Int!, limit: Int!): [Video]!
    truncatedAllVideo(skip: Int!, limit: Int!): [TruncatedVideo]!
    videoById(id: ID!): Video!
    truncatedVideoById(id: ID!): TruncatedVideo!
    truncatedVideosByIds(ids: [ID!]!): [TruncatedVideo!]!
    videoByWatchId(watchId: String!): Video!
    truncatedVideoByWatchId(watchId: String!): TruncatedVideo!

    topVideos: [TruncatedVideo]!
  }

  extend type Mutation {
    addVideo(watchId: String, video: VideoInput!): Video!
    updateVideo(videoId: String!, video: VideoInput!): Video!
    deleteVideo(videoId: String!): Result!
  }
`;

module.exports = typeDefs;
