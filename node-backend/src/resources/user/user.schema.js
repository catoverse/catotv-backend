const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    name: String
    email: String
    avatar: String
    invites: Int
  }

  type AuthUser {
    token: String!
    user: User!
  }

  input GoogleUserInput {
    name: String!
    email: String!
    google_id: String!
    avatar: String
    google_token: String
  }

  enum Role {
    USER
    ADMIN
  }

  extend type Query {
    user: User! @isAuth
    generateNewToken: AuthUser! @isAuth
  }

  extend type Mutation {
    googleLogin(user: GoogleUserInput): AuthUser
    setRole(role: Role): User! @isAuth
  }
`;

module.exports = typeDefs;
