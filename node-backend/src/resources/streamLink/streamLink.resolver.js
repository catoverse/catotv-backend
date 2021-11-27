const StreamLinkService = require("./streamLink.service");

const resolvers = {
  Query: {
    getStreamLink: async (_, { watchId }) => {
      return await StreamLinkService.getStreamLink(watchId);
    },
  },
  Mutation: {
    postStreamLink: async (_, { watchId, streamUrl }) => {
      return await StreamLinkService.postStreamLink(watchId, streamUrl);
    },
  },
};

module.exports = resolvers;
