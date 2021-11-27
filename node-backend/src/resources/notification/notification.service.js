const { ApolloError } = require("apollo-server");
const { messaging } = require("firebase-admin");

class NotificationService {
  sendNotification = async (notificationInput) => {
    try {
      await messaging().send({
        topic: notificationInput.topicId,
        data: {
          redirect: "video",
          videoId: notificationInput.videoId,
          title: notificationInput.title,
          body: notificationInput.textBody,
          image: notificationInput.imageUrl,
        },
        android: {
          priority: "high",
        },
      });
      return { data: 200, message: "Content delivered successfully" };
    } catch (error) {
      console.log(error);
      return new ApolloError(error);
    }
  };
}

module.exports = new NotificationService();
