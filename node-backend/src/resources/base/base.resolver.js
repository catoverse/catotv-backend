const BaseService = require("./base.service");

const resolvers = {
  Query: {
    getLatestVersion: async () => {
      return BaseService.getLatestVersion();
    },
  },

  Mutation: {
    iosVersionCode: async () => {
      return { data: 1 };
    },
  },
};

module.exports = resolvers;
