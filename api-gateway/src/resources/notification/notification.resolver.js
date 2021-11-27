const fetch = require("node-fetch");
const { ApolloError } = require("apollo-server");

const resolvers = {
  Query: {
    sendNotification: async (_, { notificationInput }, { authToken }) => {
      const response = await fetch(process.env.GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": authToken,
        },
        body: JSON.stringify({
          query: `query($notificationInput: NotificationInput!){
                  sendNotification(notificationInput: $notificationInput){
                    data
                    message
                  }
                }`,
          variables: { notificationInput },
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

      return data.data.sendNotification;
    },
  },
};

module.exports = resolvers;
