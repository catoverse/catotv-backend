const { gql } = require("apollo-server-express");

const typeDefs = gql`
  extend type Query {
    getStreamLink(watchId: String!): String!
  }

  extend type Mutation {
    postStreamLink(watchId: String, streamUrl: String): Result!
  }
`;

module.exports = typeDefs;
