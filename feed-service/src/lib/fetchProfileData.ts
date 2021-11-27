import axios from "axios";

export default async (userId: string, authToken: string) => {
  const response = await axios("https://api.cato.tv/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authToken: authToken,
    },
    data: {
      query: `query($userId: ID!){
                userProfile(userId: $userId){
                  selectedTopics
                  watchedVideos{
                    videoId
                  }
                }
              }`,
      variables: { userId },
    },
  });

  const data = response.data;

  if (data.errors) {
    throw new Error(data.errors[0].message);
  } else {
    return data.data.userProfile;
  }
};
