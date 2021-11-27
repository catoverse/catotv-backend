const { gql } = require("apollo-server-express");

const typeDefs = gql`
  input NotificationInput {
    topicId: String
    title: String
    textBody: String
    imageUrl: String
    videoId: String
  }

  extend type Query {
    sendNotification(notificationInput: NotificationInput!): Result! @isAuth
  }
`;

module.exports = typeDefs;
