const { gql } = require("apollo-server-express");

const typeDefs = gql`
  extend type Query {
    getFeed(userId: ID!, limit: Int!): [TruncatedVideo]!
  }
`;

module.exports = typeDefs;
