const VideoService = require("./video.service");

const resolvers = {
  Query: {
    videoByTopics: async (_, args, { user }) => {
      return await VideoService.videoByTopics(args, user.id);
    },

    allVideo: async (_, { skip, limit }) => {
      return await VideoService.allVideo(skip, limit);
    },

    videoById: async (_, args) => {
      return await VideoService.videoById(args.id);
    },
    videosByIds: async (_, args) => {
      return await VideoService.videosByIds(args.ids);
    },
    videoByWatchId: async (_, { watchId }) => {
      return await VideoService.videoByWatchId(watchId);
    },
    topVideos: async () => {
      return await VideoService.topVideos();
    },
  },
  Mutation: {
    addVideo: async (_, { watchId, video }, { user }) => {
      return await VideoService.addVideo(watchId, video, user.id);
    },
    updateVideo: async (_, { videoId, video }, { user }) => {
      return await VideoService.updateVideo(videoId, video, user.id);
    },
    deleteVideo: async (_, { videoId }, { user }) => {
      return await VideoService.deleteVideo(videoId, user.id);
    },
  },
};

module.exports = resolvers;
