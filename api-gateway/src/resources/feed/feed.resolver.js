const fetch = require("node-fetch");
const { ApolloError } = require("apollo-server");

const resolvers = {
  Query: {
    getFeed: async (_, { userId, limit }, { authToken }) => {
      const response = await fetch(
        `${process.env.FEED_ENDPOINT}/feed?userId=${userId}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            "x-auth-token": authToken,
          },
        }
      );

      const resJson = await response.json();
      if (resJson.message) {
        throw new ApolloError(resJson.message);
      }
      const data = resJson;

      if (response.status == 200) {
        return data;
      } else {
        if (response.status == 500) {
          throw new ApolloError(data);
        }
      }
    },
  },
};

module.exports = resolvers;
