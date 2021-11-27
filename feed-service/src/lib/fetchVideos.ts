import axios from "axios";
// const fetch = require("node-fetch");

export default async (
  topics: String[],
  skip: Number,
  limit: Number,
  authToken: String
) => {
  const response = await axios("https://api.cato.tv/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authToken: authToken,
    },
    data: {
      query: `query($skip: Int!, $limit: Int!, $topics: [ID!]){
                truncatedVideoByTopics(skip: $skip, limit: $limit, topics: $topics){
                  title
                  id
                  available
                  source
                  video_id
                  video_url
                  start_timestamp
                  end_timestamp
                  thumbnail_url
                  topics{
                    name, 
                    id
                  }
                  channel_name
                  channel_avatar_url
                }
              }`,
      variables: { topics, skip, limit },
    },
  });

  const data: any = response.data;

  if (data.errors) {
    throw new Error(data.errors[0].message);
  } else {
    return data.data.truncatedVideoByTopics;
  }
};
