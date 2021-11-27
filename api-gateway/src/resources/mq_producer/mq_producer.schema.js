const { gql } = require("apollo-server");

const typeDefs = gql`
  enum UserEvent {
    login
    logout
    play
    view
    pause
    skipped
    completed
    like
    share
    share_view
    bookmark
    interruption
    session_start
    session_end
    waitlist_success
    waitlist_fail
  }

  input MQProducerUserInput {
    user_id: ID!
    video_id: ID!
    video_duration: Int!
    duration_watched: Int!
    session_duration: Int!
    timestamp: String!
    description: String!
    event: UserEvent!
  }

  extend type Mutation {
    MqProducerUser(events: [MQProducerUserInput!]!): Result!
  }
`;

module.exports = typeDefs;
