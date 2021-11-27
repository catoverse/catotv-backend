const fetch = require("node-fetch");
const { ApolloError } = require("apollo-server");

const resolvers = {
  Mutation: {
    MqProducerUser: async (_, { events }, { authToken }) => {
      const response = await fetch(`${process.env.MQPRODUCER_ENDPOINT}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": authToken,
        },
        body: JSON.stringify(events),
      });

      const data = await response.json();
      if (response.status == 200) {
        const res = {
          data: response.status,
          message: data.message,
        };

        return res;
      } else {
        throw new ApolloError(data.message, response.status);
      }
    },
  },
};

module.exports = resolvers;
