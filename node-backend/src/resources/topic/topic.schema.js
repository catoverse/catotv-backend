const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Topic {
    id: ID!
    name: String!
  }

  input TopicInput {
    name: String!
  }

  extend type Query {
    allTopic: [Topic]! @isAuth
  }
`;

module.exports = typeDefs;
