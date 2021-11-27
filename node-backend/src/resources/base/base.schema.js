const { gql } = require("apollo-server-express");

const typeDefs = gql`
  directive @isAuth on FIELD_DEFINITION

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
  }

  type Mutation {
    iosVersionCode: Result!
  }
`;

module.exports = typeDefs;
