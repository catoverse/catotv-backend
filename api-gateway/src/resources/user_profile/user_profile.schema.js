const { gql } = require("apollo-server");

const typeDefs = gql`
  type TopicCount {
    topic: ID!
    count: Int!
  }

  type WatchedVideo {
    videoId: ID!
    topicId: ID!
    channelId: ID!
  }

  input WatchedVideoInput {
    videoId: ID!
    topicId: ID!
    channelId: ID!
  }

  type UserProfile {
    name: String!
    userId: ID!
    selectedTopics: [ID]!
    bookmarks: [ID]!
    totalWatchTime: Int
    videosWatchedPerTopic: [TopicCount]
    watchedVideos: [WatchedVideo]!
  }

  input UserProfileInput {
    name: String
    selectedTopics: [ID]
    userId: ID
  }

  extend type Query {
    userProfile(userId: ID!): UserProfile
  }

  extend type Mutation {
    createUserProfile(userProfile: UserProfileInput!): UserProfile
    updateUserProfile(userId: ID!, userProfile: UserProfileInput!): UserProfile
    deleteUserProfile(userId: ID!): Result
    addBookmarks(userId: ID!, bookmarks: [String]!): UserProfile
    addWatchedVideo(
      userId: String!
      videoData: [WatchedVideoInput!]!
    ): UserProfile!
  }
`;

module.exports = typeDefs;
