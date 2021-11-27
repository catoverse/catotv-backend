const { gql } = require("apollo-server");

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

  input AppleUserInput {
    authorizationCode: String!
    name: String!
    email: String!
    useBundleId: Boolean!
  }

  input SessionInput {
    name: String!
    code: String!
  }

  enum Role {
    USER
    ADMIN
  }

  extend type Query {
    user: User!
    generateNewToken: AuthUser!
  }

  extend type Mutation {
    googleLogin(user: GoogleUserInput): AuthUser
    appleLogin(user: AppleUserInput): AuthUser
    generateInvite(email: String): String
    sessionLogin(user: SessionInput): AuthUser
    addToWaitlist(email: String): Result

    setRole(role: Role): User!
  }
`;

module.exports = typeDefs;
