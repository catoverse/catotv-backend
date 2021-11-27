import { UserProfileModel } from "../models/userProfile.model";
import { UserProfileInput } from "../schemas/UserProfile";
import { UserProfile } from "../dtos/userProfile.dto";
import { Result } from "../schemas/result";

import { ApolloError } from "apollo-server-errors";

export class UserProfileService {
  public async findById(userId: string): Promise<UserProfile> {
    try {
      const user = await UserProfileModel.findOne({ userId });

      if (!user) throw new ApolloError("Invalid userId", "400");

      return user;
    } catch (error) {
      throw new ApolloError(error.message, "500");
    }
  }

  public async create(userProfile: UserProfileInput): Promise<UserProfile> {
    try {
      return await new UserProfileModel({ ...userProfile }).save();
    } catch (error) {
      throw new ApolloError(error.message, "500");
    }
  }

  public async update(
    userId: string,
    userProfile: UserProfileInput
  ): Promise<UserProfile> {
    await UserProfileModel.updateOne({ userId }, { ...userProfile });

    return await UserProfileModel.findOne({ userId });
  }

  public async deleteById(userId: string): Promise<Result> {
    try {
      const results = await UserProfileModel.deleteOne({ userId });

      if (results.ok == 1) return { message: "Success", data: 200 };
      if (results.n < 1) throw new ApolloError("Invalid userId", "400");
    } catch (error) {
      throw new ApolloError(error.message, "500");
    }
  }

  public async addBookmarks(
    userId: string,
    bookmarks: string[]
  ): Promise<UserProfile> {
    try {
      const userProfile = await UserProfileModel.findOneAndUpdate(
        { userId: userId },
        {
          $push: {
            bookmarks: { $each: bookmarks },
          },
        },
        { returnOriginal: false }
      );

      return userProfile;
    } catch (error) {
      throw new ApolloError(error.message, "500");
    }
  }
  public async addVideos(
    userId: string,
    videoData: { videoId: string; topicId: string; channelId: string }[]
  ): Promise<UserProfile> {
    try {
      const arr = videoData.map(({ videoId, topicId, channelId }) => {
        return { videoId, topicId, channelId };
      });

      const userProfile = await UserProfileModel.findOneAndUpdate(
        { userId: userId },
        {
          $push: {
            watchedVideos: { $each: arr },
          },
        },
        { returnOriginal: false }
      );

      return userProfile;
    } catch (error) {
      throw new ApolloError(error.message, "500");
    }
  }
}

export default new UserProfileService();
