const { ApolloError } = require("apollo-server");
const StreamLink = require("./streamLink.model");

class StreamLinkService {
  getStreamLink = async (watchId) => {
    try {
      const streamLink = await StreamLink.findOne({ watchId });

      if (streamLink) {
        console.log();
        const isValid = new Date() < streamLink.expire;

        if (isValid) {
          return streamLink.url;
        } else if (!isValid) {
          throw new ApolloError("Link Expired", 400);
        }
      } else {
        throw new ApolloError("Link Not Found", 404);
      }
    } catch (error) {
      throw new ApolloError(error.message, 500);
    }
  };

  postStreamLink = async (watchId, streamUrl) => {
    try {
      const epoch = streamUrl.substring(
        streamUrl.search("expire") + 7,
        streamUrl.search("&")
      );
      const streamLink = {
        watchId,
        url: streamUrl,
        expire: new Date(Number(epoch) * 1000),
      };
      const savedDoc = await StreamLink.updateOne({ watchId }, streamLink, {
        new: true,
        upsert: true,
      });

      if (savedDoc) {
        return { data: 200, message: "stream link added succesfully" };
      } else {
        throw new ApolloError("Couldn't save the stream link", 500);
      }
    } catch (error) {
      throw new ApolloError(error.message, 500);
    }
  };
}

module.exports = new StreamLinkService();
