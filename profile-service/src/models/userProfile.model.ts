import { model, Schema, Document } from "mongoose";
import { UserProfile } from "../dtos/userProfile.dto";

const userSchema = new Schema({
  userId: { type: "ObjectId", required: true },
  name: {
    type: "String",
    default: "No name",
  },
  selectedTopics: {
    type: ["ObjectId"],
    ref: "topic",
    default: [],
  },
  bookmarks: {
    type: ["ObjectId"],
    ref: "video",
    default: [],
  },
  totalWatchTime: {
    type: "Number",
    default: 0,
  },
  videosWatchedPerTopic: {
    type: [{ topic: String, count: Number }],
    default: [],
  },
  watchedVideos: {
    type: [{ videoId: String, topicId: String, channelId: String }],
    default: [],
  },
});
//const UserModel = model<User>('User', schema);
export const UserProfileModel = model<UserProfile & Document>(
  "Userprofile",
  userSchema
);
