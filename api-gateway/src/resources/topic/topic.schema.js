const { gql } = require("apollo-server");

const typeDefs = gql`
  type Topic {
    id: ID!
    name: String!
  }

  input TopicInput {
    name: String!
  }

  extend type Query {
    allTopic: [Topic]!
  }
`;

module.exports = typeDefs;
