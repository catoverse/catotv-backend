const NotificationService = require("./notification.service");

const resolvers = {
  Query: {
    sendNotification: async (_, { notificationInput }) => {
      return await NotificationService.sendNotification(notificationInput);
    },
  },
};

module.exports = resolvers;
