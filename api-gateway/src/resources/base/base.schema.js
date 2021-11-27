const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Result {
    data: Int
    message: String
  }

  type Version {
    version: String
    required: Boolean
  }

  type Query {
    getLatestVersion: Version!
    androidVersionCode: Result!
  }

  type Mutation {
    iosVersionCode: Result!
  }
`;

module.exports = typeDefs;
