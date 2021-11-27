const fetch = require("node-fetch");
const { ApolloError } = require("apollo-server");

const resolvers = {
  Query: {
    getLatestVersion: async () => {
      const response = await fetch(process.env.GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `query{
                    getLatestVersion{
                        version
                        required
                    }
                  }`,
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

      return data.data.getLatestVersion;
    },
    androidVersionCode: async () => {
      return { data: 1 };
    },
  },

  Mutation: {
    iosVersionCode: async () => {
      return { data: 1 };
    },
  },
};

module.exports = resolvers;
