const fetch = require("node-fetch");
const { ApolloError } = require("apollo-server");

const resolvers = {
  Query: {
    getStreamLink: async (_, { watchId }, { authToken }) => {
      const response = await fetch(process.env.GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": authToken,
        },
        body: JSON.stringify({
          query: `query($watchId: String!){
                    getStreamLink(watchId: $watchId)
                  }`,
          variables: { watchId },
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

      return data.data.getStreamLink;
    },
  },
  Mutation: {
    postStreamLink: async (_, { watchId, streamUrl }, { authToken }) => {
      const response = await fetch(process.env.GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": authToken,
        },
        body: JSON.stringify({
          query: `mutation($watchId: String!, $streamUrl: String!){
                  postStreamLink(watchId: $watchId, streamUrl: $streamUrl){
                    data
                    message
                  }
                }`,
          variables: { watchId, streamUrl },
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

      return data.data.postStreamLink;
    },
  },
};

module.exports = resolvers;
