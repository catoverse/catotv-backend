const { ApolloError } = require("apollo-server");
const fetch = require("node-fetch");

const Video = require("./video.model");
const UserProfile = require("../user_profile/user_profile.model");
const User = require("../user/user.model");
const Topic = require("../topic/topic.model");

class VideoService {
  videoById = async (id) => {
    try {
      let video = await Video.findById(id).populate("topics");
      if (!video) {
        throw new ApolloError("Video not found", 404);
      }
      return video;
    } catch (err) {
      console.log(err);
      throw new ApolloError(err.message, 500);
    }
  };

  videosByIds = async (ids) => {
    try {
      let videos = await Video.find({ _id: { $in: ids } }).populate("topics");
      if (!videos) {
        throw new ApolloError("Videos not found", 404);
      }
      return videos;
    } catch (err) {
      console.log(err);
      throw new ApolloError(err.message, 500);
    }
  };

  videoByWatchId = async (watchId) => {
    try {
      let video = await Video.findOne({
        video_id: watchId,
        source: "YouTube",
      }).populate("topics");
      if (!video) {
        throw new ApolloError("Video not found", 404);
      }
      return video;
    } catch (err) {
      console.log(err);
      throw new ApolloError(err.message, 500);
    }
  };

  allVideo = async (skip, limit) => {
    try {
      return await Video.find().populate("topics").limit(limit).skip(skip);
    } catch (err) {
      console.log(err);
      throw new ApolloError(err.message, 500);
    }
  };
  videoByTopics = async ({ topics, skip, limit }, user_id) => {
    try {
      let isAll = !topics;
      let profile = await UserProfile.findOne({ user_id });
      let index = 0;
      //if topics is undefined fetch from user_profile
      if (isAll) {
        index = profile.video_index;
        topics = profile.topics;
      } else {
        index = skip;
      }

      let videos = await Video.find({ topics: { $in: topics } })
        .populate("topics")
        .skip(index)
        .limit(limit);

      if (isAll) {
        videos.length < limit ? (index = 0) : (index = index + limit);
        profile.video_index = index;
        profile.save();
      }

      return videos;
    } catch (err) {
      console.log(err);
      throw new ApolloError(err.message, 500);
    }
  };

  addVideo = async (watchId, video, userId) => {
    try {
      const user = await User.findById(userId);

      if (user.role == "ADMIN") {
        const topicIds = [];

        for (const topic of video.topics) {
          const topicDoc = await Topic.findOne({ name: topic.name });
          if (!topicDoc)
            new ApolloError(`Topic: ${topic.name} does not exist`, 400);

          topicIds.push(topicDoc._id);
        }
        video = {
          ...video,
          topics: topicIds,
          added_by: userId,
        };

        if (video.source === "YouTube") {
          //Fetch and add video metadata
          const response = await fetch(
            `http://206.189.139.37:30449/metadata?video_ids=${watchId}`
          );

          if (response.status === 200) {
            resData = await response.json();
            metadata = resData.values[0];

            video = { ...video, metadata };
          } else {
            throw new ApolloError(
              "Failed to fetch video metadata from YouTube",
              500
            );
          }
        }

        return await new Video(video).save();
        //return await Video.findOne({ _id: savedVid._id }).populate("topic");
      } else {
        new ApolloError("User Not Authorized", 401);
      }
    } catch (err) {
      console.error(err);
      throw new ApolloError(err.message, 500);
    }
  };

  updateVideo = async (videoId, video, userId) => {
    try {
      const user = await User.findById(userId);
      let foundVideo = await Video.findById(videoId);

      if (!foundVideo) {
        throw new ApolloError("Invalid Video ID", 400);
      }

      if (
        user.role == "ADMIN" &&
        (foundVideo.added_by == userId || !foundVideo.added_by)
      ) {
        if (video.topics) {
          const topicIds = [];
          for (const topic of video.topics) {
            let topicDoc = await Topic.findOne({ name: video.topic.name });
            if (!topicDoc)
              new ApolloError(`Topic: ${topic.name} does not exist`, 400);

            topicIds.push(topicDoc._id);
          }
          await Video.updateOne(
            { _id: videoId },
            { ...video, topics: topicIds }
          );
        } else {
          await Video.updateOne({ _id: videoId }, video);
        }
        return await Video.findOne({ _id: videoId }).populate("topics");
      } else {
        new ApolloError("User Not Authorized", 401);
      }
    } catch (err) {
      console.error(err);
      throw new ApolloError(err.message, 500);
    }
  };

  deleteVideo = async (videoId, userId) => {
    try {
      const user = await User.findById(userId);
      const foundVideo = await Video.findById(videoId);

      if (!foundVideo) {
        return { data: 200, message: "No Content" };
      }

      if (
        user.role == "ADMIN" &&
        (foundVideo.added_by == userId || !foundVideo.added_by)
      ) {
        await foundVideo.remove();
        return { data: 200, message: "No Content" };
      }
    } catch (err) {
      console.error(err);
      throw new ApolloError(err.message, 500);
    }
  };

  topVideos = async () => {
    try {
      let videos = await Video.find({ top: true }).populate("topics");
      if (videos.length < 1) {
        return [];
      }
      return videos;
    } catch (err) {
      console.log(err);
      throw new ApolloError(err.message, 500);
    }
  };
}

module.exports = new VideoService();
