import { Resolver, Query, Arg, Mutation } from "type-graphql";

import { UserProfile, UserProfileInput ,WatchedVideoInput} from "../schemas/UserProfile";
import { Result } from "../schemas/result";
import userProfileService from "../services/userProfile.service";

@Resolver((of) => UserProfile)
export class UserProfileResolver {
  @Query((returns) => UserProfile)
  async userProfile(@Arg("userId") userId: string): Promise<UserProfile> {
    return await userProfileService.findById(userId);
  }

  @Mutation((returns) => UserProfile)
  async createUserProfile(
    @Arg("userProfileInput") userProfileInput: UserProfileInput
  ): Promise<UserProfile> {
    return await userProfileService.create(userProfileInput);
  }

  @Mutation((returns) => UserProfile)
  async updateUserProfile(
    @Arg("userId") userId: string,
    @Arg("userProfileInput") userProfileInput: UserProfileInput
  ): Promise<UserProfile> {
    return await userProfileService.update(userId, userProfileInput);
  }

  @Mutation((returns) => Result)
  async deleteUserProfile(@Arg("userId") userId: string): Promise<Result> {
    return await userProfileService.deleteById(userId);
  }

  @Mutation((returns) => UserProfile)
  async addBookmarks(
    @Arg("userId") userId: string,
    @Arg("bookmarks", (type) => [String]) bookmarks: string[]
  ): Promise<UserProfile> {
    return await userProfileService.addBookmarks(userId, bookmarks);
  }

  @Mutation((returns) => UserProfile)
  async addWatchedVideo(
    @Arg("userId") userId: string,
    @Arg("videoData", (type) => [WatchedVideoInput]) videoData: {videoId:string, topicId:string, channelId:string}[]
  ): Promise<UserProfile> {
    return await userProfileService.addVideos(userId, videoData);
  }
}
