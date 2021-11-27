const fetch = require("node-fetch");
const { ApolloError } = require("apollo-server");

const resolvers = {
  Query: {
    userProfile: async (_, { userId }, { authToken }) => {
      const response = await fetch(process.env.USER_PROFILE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": authToken,
        },
        body: JSON.stringify({
          query: `query($userId: String!){
                    userProfile(userId: $userId){
                      name
                      userId
                      selectedTopics
                      bookmarks
                      totalWatchTime
                      videosWatchedPerTopic{
                        topic
                        count
                      }
                      watchedVideos{
                        videoId
                        topicId
                        channelId
                      }
                    }
                  }`,
          variables: { userId },
        }),
      });

      const data = await response.json();

      if (data.errors && data.errors.length > 0) {
        for (const error of data.errors) {
          throw new ApolloError(error.message, 500);
        }
      } else if (!data.data) {
        throw new ApolloError(data.message, 500);
      }

      return data.data.userProfile;
    },
  },
  Mutation: {
    createUserProfile: async (_, { userProfile }, { authToken }) => {
      const response = await fetch(process.env.USER_PROFILE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": authToken,
        },
        body: JSON.stringify({
          query: `mutation($userProfile: UserProfileInput!){
                    createUserProfile(userProfileInput: $userProfile){
                      name
                      userId
                      selectedTopics
                      bookmarks
                      totalWatchTime
                      videosWatchedPerTopic{
                        topic
                        count
                      }
                      watchedVideos{
                        videoId
                        topicId
                        channelId
                      }
                    }
                  }`,
          variables: { userProfile },
        }),
      });

      const data = await response.json();

      if (data.errors && data.errors.length > 0) {
        for (const error of data.errors) {
          throw new ApolloError(error.message, 500);
        }
      } else if (!data.data) {
        throw new ApolloError(data.message, 500);
      }

      return data.data.createUserProfile;
    },
    updateUserProfile: async (_, { userId, userProfile }, { authToken }) => {
      const response = await fetch(process.env.USER_PROFILE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": authToken,
        },
        body: JSON.stringify({
          query: `mutation($userProfile: UserProfileInput!, $userId: String!){
                    updateUserProfile(userId: $userId, userProfileInput: $userProfile){
                      name
                      userId
                      selectedTopics
                      bookmarks
                      totalWatchTime
                      videosWatchedPerTopic{
                        topic
                        count
                      }
                      watchedVideos{
                        videoId
                        topicId
                        channelId
                      }
                    }
                  }`,
          variables: { userProfile, userId },
        }),
      });

      const data = await response.json();

      if (data.errors && data.errors.length > 0) {
        for (const error of data.errors) {
          throw new ApolloError(error.message, 500);
        }
      } else if (!data.data) {
        throw new ApolloError(data.message, 500);
      }

      return data.data.updateUserProfile;
    },
    deleteUserProfile: async (_, { userId }, { authToken }) => {
      const response = await fetch(process.env.USER_PROFILE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": authToken,
        },
        body: JSON.stringify({
          query: `mutation($userId: String!){
                    deleteUserProfile(userId: $userId){
                      message
                      data
                    }
                  }`,
          variables: { userId },
        }),
      });

      const data = await response.json();

      if (data.errors && data.errors.length > 0) {
        for (const error of data.errors) {
          throw new ApolloError(error.message, 500);
        }
      } else if (!data.data) {
        throw new ApolloError(data.message, 500);
      }

      return data.data.deleteUserProfile;
    },
    addBookmarks: async (_, { userId, bookmarks }, { authToken }) => {
      const response = await fetch(process.env.USER_PROFILE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": authToken,
        },
        body: JSON.stringify({
          query: `mutation($userId: String!, $bookmarks: [String!]!){
                    addBookmarks(userId: $userId, bookmarks: $bookmarks){
                      name
                      userId
                      selectedTopics
                      bookmarks
                      totalWatchTime
                      videosWatchedPerTopic{
                        topic
                        count
                      }
                      watchedVideos{
                        videoId
                        topicId
                        channelId
                      }
                    }
                  }`,
          variables: { userId, bookmarks },
        }),
      });

      const data = await response.json();

      if (data.errors && data.errors.length > 0) {
        for (const error of data.errors) {
          throw new ApolloError(error.message, 500);
        }
      } else if (!data.data) {
        throw new ApolloError(data.message, 500);
      }

      return data.data.addBookmarks;
    },
    addWatchedVideo: async (_, { userId, watchedVideo }, { authToken }) => {
      const response = await fetch(process.env.USER_PROFILE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": authToken,
        },
        body: JSON.stringify({
          query: `mutation($userId: String!, $watchedVideo: [WatchedVideoInput!]!){
                    addWatchedVideo(userId: $userId, videoData: $watchedVideo){
                      name
                      userId
                      selectedTopics
                      bookmarks
                      totalWatchTime
                      videosWatchedPerTopic{
                        topic
                        count
                      }
                      watchedVideos{
                        videoId
                        topicId
                        channelId
                      }
                    }
                  }`,
          variables: { userId, watchedVideo },
        }),
      });

      const data = await response.json();

      if (data.errors && data.errors.length > 0) {
        for (const error of data.errors) {
          throw new ApolloError(error.message, 500);
        }
      } else if (!data.data) {
        throw new ApolloError(data.message, 500);
      }

      return data.data.addWatchedVideo;
    },
  },
};

module.exports = resolvers;
