const fetch = require("node-fetch");
const { ApolloError } = require("apollo-server");

const resolvers = {
  Query: {
    videoByTopics: async (_, { topics, skip, limit }, { authToken }) => {
      const response = await fetch(process.env.GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": authToken,
        },
        body: JSON.stringify({
          query: `query($topics: [ID!], $skip: Int!, $limit: Int!){
                            videoByTopics(topics: $topics, skip: $skip, limit: $limit){
                              id
                              title
                              available
                              tags
                              source
                              video_id
                              video_url
                              start_timestamp
                              end_timestamp
                              topics{
                                id
                                name
                              }
                              channel_information{
                                id
                                name
                                subscriber_count
                                thumbnails{
                                  default{
                                    height
                                    url
                                    width
                                  }
                                  high{
                                    height
                                    url
                                    width
                                  }
                                  medium{
                                    height
                                    url
                                    width
                                  }
                                  standard{
                                    height
                                    url
                                    width
                                  }
                                  maxres{
                                    height
                                    url
                                    width
                                  }
                                }
                              }
                              comments_analysis{
                                comments_available
                                negative_comments
                                negativity_ratio
                                positive_comments
                                positivity_ratio
                                total_comments
                              }
                              content_details{
                                captions_available
                                dislikes
                                duration
                                likes
                                thumbnails{
                                  default{
                                    height
                                    url
                                    width
                                  }
                                  high{
                                    height
                                    url
                                    width
                                  }
                                  medium{
                                    height
                                    url
                                    width
                                  }
                                  standard{
                                    height
                                    url
                                    width
                                  }
                                  maxres{
                                    height
                                    url
                                    width
                                  }
                                }
                                views
                                youtube_category
                              }
                             }
                            }`,
          variables: { topics, skip, limit },
        }),
      });

      const data = await response.json();

      if (data.errors && data.errors.length > 0) {
        for (const error of data.errors) {
          throw new ApolloError(error.message, 500);
        }
      } else if (!data.data) {
        throw new ApolloError(data.message, 500);
      }

      return data.data.videoByTopics;
    },

    truncatedVideoByTopics: async (
      _,
      { topics, skip, limit },
      { authToken }
    ) => {
      const response = await fetch(process.env.GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": authToken,
        },
        body: JSON.stringify({
          query: `        query($topics: [ID!], $skip: Int!, $limit: Int!){
                            videoByTopics(topics: $topics, skip: $skip, limit: $limit){
                              id
                              title
                              available
                              source
                              video_id
                              video_url
                              start_timestamp
                              end_timestamp
                              topics{
                                id
                                name
                              }
                              channel_information{
                                id
                                name
                                subscriber_count
                                thumbnails{
                                  default{
                                    height
                                    url
                                    width
                                  }
                                }
                              }
                              content_details{
                                thumbnails{
                                  default{
                                    height
                                    url
                                    width
                                  }
                                }
                              }
                            }
                          }`,
          variables: { topics, skip, limit },
        }),
      });

      const data = await response.json();

      if (data.errors && data.errors.length > 0) {
        for (const error of data.errors) {
          throw new ApolloError(error.message, 500);
        }
      } else if (!data.data) {
        throw new ApolloError(data.message, 500);
      }

      const dbRes = data.data.videoByTopics;
      let resData = [];

      for (vid of dbRes) {
        const vidObj = {
          title: vid.title,
          id: vid.id,
          source: vid.source,
          video_id: vid.video_id,
          video_url: vid.video_url,
          topics: vid.topics,
          channel_name: vid.channel_information.name,
          channel_avatar_url: vid.channel_information.thumbnails.default.url,
          start_timestamp: vid.start_timestamp,
          end_timestamp: vid.end_timestamp,
          thumbnail_url: vid.content_details.thumbnails.default.url,
        };
        resData.push(vidObj);
      }

      return resData;
    },

    allVideo: async (_, { skip, limit }, { authToken }) => {
      const response = await fetch(process.env.GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": authToken,
        },
        body: JSON.stringify({
          query: `query($skip: Int!, $limit: Int!){
                                allVideo(skip: $skip, limit: $limit){
                                  id
                                  title
                                  available
                                  tags
                                  source
                                  video_id
                                  video_url
                                  start_timestamp
                                  end_timestamp
                                  topics{
                                    id
                                    name
                                  }
                                  channel_information{
                                    id
                                    name
                                    subscriber_count
                                    thumbnails{
                                      default{
                                        height
                                        url
                                        width
                                      }
                                      high{
                                        height
                                        url
                                        width
                                      }
                                      medium{
                                        height
                                        url
                                        width
                                      }
                                      standard{
                                        height
                                        url
                                        width
                                      }
                                      maxres{
                                        height
                                        url
                                        width
                                      }
                                    }
                                  }
                                  comments_analysis{
                                    comments_available
                                    negative_comments
                                    negativity_ratio
                                    positive_comments
                                    positivity_ratio
                                    total_comments
                                  }
                                  content_details{
                                    captions_available
                                    dislikes
                                    duration
                                    likes
                                    thumbnails{
                                      default{
                                        height
                                        url
                                        width
                                      }
                                      high{
                                        height
                                        url
                                        width
                                      }
                                      medium{
                                        height
                                        url
                                        width
                                      }
                                      standard{
                                        height
                                        url
                                        width
                                      }
                                      maxres{
                                        height
                                        url
                                        width
                                      }
                                    }
                                    views
                                    youtube_category
                                  }
                                 }
                                }`,
          variables: { skip, limit },
        }),
      });

      const data = await response.json();

      if (data.errors && data.errors.length > 0) {
        for (const error of data.errors) {
          throw new ApolloError(error.message, 500);
        }
      } else if (!data.data) {
        throw new ApolloError(data.message, 500);
      }

      return data.data.allVideo;
    },

    truncatedAllVideo: async (_, { skip, limit }, { authToken }) => {
      const response = await fetch(process.env.GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": authToken,
        },
        body: JSON.stringify({
          query: `query($skip: Int!, $limit: Int!){
                                allVideo(skip: $skip, limit: $limit){
                                  id
                                  title
                                  available
                                  source
                                  video_id
                                  video_url
                                  start_timestamp
                                  end_timestamp
                                  topics{
                                    id
                                    name
                                  }
                                  channel_information{
                                    id
                                    name
                                    subscriber_count
                                    thumbnails{
                                      default{
                                        height
                                        url
                                        width
                                      }
                                    }
                                  }
                                  content_details{
                                    thumbnails{
                                      default{
                                        height
                                        url
                                        width
                                      }
                                    }
                                  }
                                 }
                                }`,
          variables: { skip, limit },
        }),
      });

      const data = await response.json();

      if (data.errors && data.errors.length > 0) {
        for (const error of data.errors) {
          throw new ApolloError(error.message, 500);
        }
      } else if (!data.data) {
        throw new ApolloError(data.message, 500);
      }

      const dbRes = data.data.allVideo;
      let resData = [];

      for (vid of dbRes) {
        const vidObj = {
          title: vid.title,
          id: vid.id,
          source: vid.source,
          video_id: vid.video_id,
          video_url: vid.video_url,
          available: vid.available,
          topics: vid.topics,
          channel_name: vid.channel_information.name,
          channel_avatar_url: vid.channel_information.thumbnails.default.url,
          start_timestamp: vid.start_timestamp,
          end_timestamp: vid.end_timestamp,
          thumbnail_url: vid.content_details.thumbnails.default.url,
        };
        resData.push(vidObj);
      }

      return resData;
    },

    videoById: async (_, { id }, { authToken }) => {
      const response = await fetch(process.env.GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": authToken,
        },
        body: JSON.stringify({
          query: `query($id: ID!){
                            videoById(id: $id){
                              id
                              title
                              available
                              tags
                              source
                              video_id
                              video_url
                              start_timestamp
                              end_timestamp
                              topics{
                                id
                                name
                              }
                              channel_information{
                                id
                                name
                                subscriber_count
                                thumbnails{
                                  default{
                                    height
                                    url
                                    width
                                  }
                                  high{
                                    height
                                    url
                                    width
                                  }
                                  medium{
                                    height
                                    url
                                    width
                                  }
                                  standard{
                                    height
                                    url
                                    width
                                  }
                                  maxres{
                                    height
                                    url
                                    width
                                  }
                                }
                              }
                              comments_analysis{
                                comments_available
                                negative_comments
                                negativity_ratio
                                positive_comments
                                positivity_ratio
                                total_comments
                              }
                              content_details{
                                captions_available
                                dislikes
                                duration
                                likes
                                thumbnails{
                                  default{
                                    height
                                    url
                                    width
                                  }
                                  high{
                                    height
                                    url
                                    width
                                  }
                                  medium{
                                    height
                                    url
                                    width
                                  }
                                  standard{
                                    height
                                    url
                                    width
                                  }
                                  maxres{
                                    height
                                    url
                                    width
                                  }
                                }
                                views
                                youtube_category
                              }
                             }
                            }`,
          variables: { id },
        }),
      });

      const data = await response.json();

      if (data.errors && data.errors.length > 0) {
        for (const error of data.errors) {
          throw new ApolloError(error.message, 500);
        }
      } else if (!data.data) {
        throw new ApolloError(data.message, 500);
      }

      return data.data.videoById;
    },

    truncatedVideoById: async (_, { id }, { authToken }) => {
      const response = await fetch(process.env.GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": authToken,
        },
        body: JSON.stringify({
          query: `query($id: ID!){
                            videoById(id: $id){
                                  id
                                  title
                                  available
                                  source
                                  video_id
                                  video_url
                                  start_timestamp
                                  end_timestamp
                                  topics{
                                    id
                                    name
                                  }
                                  channel_information{
                                    id
                                    name
                                    subscriber_count
                                    thumbnails{
                                      default{
                                        height
                                        url
                                        width
                                      }
                                    }
                                  }
                                  content_details{
                                    thumbnails{
                                      default{
                                        height
                                        url
                                        width
                                      }
                                    }
                                  }
                             }
                            }`,
          variables: { id },
        }),
      });

      const data = await response.json();

      if (data.errors && data.errors.length > 0) {
        for (const error of data.errors) {
          throw new ApolloError(error.message, 500);
        }
      } else if (!data.data) {
        throw new ApolloError(data.message, 500);
      }

      const vid = data.data.videoById;

      const vidObj = {
        title: vid.title,
        id: vid.id,
        source: vid.source,
        video_id: vid.video_id,
        video_url: vid.video_url,
        topics: vid.topics,
        channel_name: vid.channel_information.name,
        channel_avatar_url: vid.channel_information.thumbnails.default.url,
        start_timestamp: vid.start_timestamp,
        end_timestamp: vid.end_timestamp,
        thumbnail_url: vid.content_details.thumbnails.default.url,
      };

      return vidObj;
    },

    truncatedVideosByIds: async (_, { ids }, { authToken }) => {
      const response = await fetch(process.env.GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": authToken,
        },
        body: JSON.stringify({
          query: `query($ids: [ID!]!){
                    videosByIds(ids: $ids){
                      id
                      title
                      available
                      tags
                      source
                      video_id
                      video_url
                      start_timestamp
                      end_timestamp
                      topics{
                        id
                        name
                      }
                      channel_information{
                        id
                        name
                        subscriber_count
                        thumbnails{
                         default{
                          url
                        }
                       }
                      }
                      comments_analysis{
                        comments_available
                        negative_comments
                        negativity_ratio
                        positive_comments
                        positivity_ratio
                        total_comments
                      }
                      content_details{
                        captions_available
                        dislikes
                        duration
                        likes
                        thumbnails{
                          default{
                            height
                            url
                            width
                          }
                        }
                        views
                        youtube_category
                      }
                    }
                  }`,
          variables: { ids },
        }),
      });

      const data = await response.json();

      if (data.errors && data.errors.length > 0) {
        for (const error of data.errors) {
          throw new ApolloError(error.message, 500);
        }
      } else if (!data.data) {
        throw new ApolloError(data.message, 500);
      }

      const dbRes = data.data.videosByIds;
      let resData = [];

      for (vid of dbRes) {
        const vidObj = {
          available: vid.available,
          title: vid.title,
          id: vid.id,
          source: vid.source,
          video_id: vid.video_id,
          video_url: vid.video_url,
          topics: vid.topics,
          channel_name: vid.channel_information.name,
          channel_avatar_url: vid.channel_information.thumbnails.default.url,
          start_timestamp: vid.start_timestamp,
          end_timestamp: vid.end_timestamp,
          thumbnail_url: vid.content_details.thumbnails.default.url,
        };
        resData.push(vidObj);
      }

      return resData;
    },

    videoByWatchId: async (_, { watchId }, { authToken }) => {
      const response = await fetch(process.env.GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": authToken,
        },
        body: JSON.stringify({
          query: `query($watchId: String!){
                            videoByWatchId(watchId: $watchId){
                              id
                              title
                              available
                              tags
                              source
                              video_id
                              video_url
                              start_timestamp
                              end_timestamp
                              topics{
                                id
                                name
                              }
                              channel_information{
                                id
                                name
                                subscriber_count
                                thumbnails{
                                  default{
                                    height
                                    url
                                    width
                                  }
                                  high{
                                    height
                                    url
                                    width
                                  }
                                  medium{
                                    height
                                    url
                                    width
                                  }
                                  standard{
                                    height
                                    url
                                    width
                                  }
                                  maxres{
                                    height
                                    url
                                    width
                                  }
                                }
                              }
                              comments_analysis{
                                comments_available
                                negative_comments
                                negativity_ratio
                                positive_comments
                                positivity_ratio
                                total_comments
                              }
                              content_details{
                                captions_available
                                dislikes
                                duration
                                likes
                                thumbnails{
                                  default{
                                    height
                                    url
                                    width
                                  }
                                  high{
                                    height
                                    url
                                    width
                                  }
                                  medium{
                                    height
                                    url
                                    width
                                  }
                                  standard{
                                    height
                                    url
                                    width
                                  }
                                  maxres{
                                    height
                                    url
                                    width
                                  }
                                }
                                views
                                youtube_category
                              }
                             }
                            }`,
          variables: { watchId },
        }),
      });

      const data = await response.json();

      if (data.errors && data.errors.length > 0) {
        for (const error of data.errors) {
          throw new ApolloError(error.message, 500);
        }
      } else if (!data.data) {
        throw new ApolloError(data.message, 500);
      }

      return data.data.videoByWatchId;
    },

    truncatedVideoByWatchId: async (_, { watchId }, { authToken }) => {
      const response = await fetch(process.env.GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": authToken,
        },
        body: JSON.stringify({
          query: `query($watchId: String!){
                            videoByWatchId(watchId: $watchId){
                                  id
                                  title
                                  available
                                  source
                                  video_id
                                  video_url
                                  start_timestamp
                                  end_timestamp
                                  topics{
                                    id
                                    name
                                  }
                                  channel_information{
                                    id
                                    name
                                    subscriber_count
                                    thumbnails{
                                      default{
                                        height
                                        url
                                        width
                                      }
                                    }
                                  }
                                  content_details{
                                    thumbnails{
                                      default{
                                        height
                                        url
                                        width
                                      }
                                    }
                                  }
                             }
                            }`,
          variables: { watchId },
        }),
      });

      const data = await response.json();

      if (data.errors && data.errors.length > 0) {
        for (const error of data.errors) {
          throw new ApolloError(error.message, 500);
        }
      } else if (!data.data) {
        throw new ApolloError(data.message, 500);
      }

      const vid = data.data.videoByWatchId;

      const vidObj = {
        title: vid.title,
        id: vid.id,
        source: vid.source,
        video_id: vid.video_id,
        video_url: vid.video_url,
        topics: vid.topics,
        channel_name: vid.channel_information.name,
        channel_avatar_url: vid.channel_information.thumbnails.default.url,
        start_timestamp: vid.start_timestamp,
        end_timestamp: vid.end_timestamp,
        thumbnail_url: vid.content_details.thumbnails.default.url,
      };

      return vidObj;
    },
    topVideos: async () => {
      const response = await fetch(process.env.GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `        query{
                            topVideos{
                              id
                              title
                              available
                              source
                              video_id
                              video_url
                              start_timestamp
                              end_timestamp
                              topics{
                                id
                                name
                              }
                              channel_information{
                                id
                                name
                                subscriber_count
                                thumbnails{
                                  default{
                                    height
                                    url
                                    width
                                  }
                                }
                              }
                              content_details{
                                thumbnails{
                                  default{
                                    height
                                    url
                                    width
                                  }
                                }
                              }
                            }
                          }`,
        }),
      });

      const data = await response.json();

      if (data.errors && data.errors.length > 0) {
        for (const error of data.errors) {
          throw new ApolloError(error.message, 500);
        }
      } else if (!data.data) {
        throw new ApolloError(data.message, 500);
      }

      const dbRes = data.data.topVideos;
      let resData = [];

      for (vid of dbRes) {
        const vidObj = {
          title: vid.title,
          id: vid.id,
          source: vid.source,
          video_id: vid.video_id,
          video_url: vid.video_url,
          topics: vid.topics,
          channel_name: vid.channel_information.name,
          channel_avatar_url: vid.channel_information.thumbnails.default.url,
          start_timestamp: vid.start_timestamp,
          end_timestamp: vid.end_timestamp,
          thumbnail_url: vid.content_details.thumbnails.default.url,
        };
        resData.push(vidObj);
      }

      return resData;
    },
  },
  Mutation: {
    addVideo: async (_, { watchId, video }, { authToken }) => {
      const response = await fetch(process.env.GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": authToken,
        },
        body: JSON.stringify({
          query: `mutation ($watchId: String!, $video: VideoInput!){
                  addVideo(watchId: $watchId, video: $video){
                    author_name
                    end_timestamp
                    id
                    start_timestamp
                    title    
                    topics{
                      name
                      id
                    }
                    video_url
                  }
                }`,
          variables: { watchId, video },
        }),
      });

      const data = await response.json();

      if (data.errors && data.errors.length > 0) {
        for (const error of data.errors) {
          throw new ApolloError(error.message, 500);
        }
      } else if (!data.data) {
        throw new ApolloError(data.message, 500);
      }

      return data.data.addVideo;
    },
    updateVideo: async (_, { videoId, video }, { authToken }) => {
      const response = await fetch(process.env.GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": authToken,
        },
        body: JSON.stringify({
          query: `mutation ($videoId: String!, $video: VideoInput!){
                  updateVideo(videoId: $videoId, video: $video){
                    author_name
                    end_timestamp
                    id
                    start_timestamp
                    title    
                    topics{
                      name
                      id
                    }
                    video_url
                  }
                }`,
          variables: { videoId, video },
        }),
      });

      const data = await response.json();

      if (data.errors && data.errors.length > 0) {
        for (const error of data.errors) {
          throw new ApolloError(error.message, 500);
        }
      } else if (!data.data) {
        throw new ApolloError(data.message, 500);
      }

      return data.data.updateVideo;
    },
    deleteVideo: async (_, { videoId }, { authToken }) => {
      const response = await fetch(process.env.GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": authToken,
        },
        body: JSON.stringify({
          query: `mutation($videoId: String){
                  deleteVideo(videoId: $videoId){
                    data
                    message
                  }
                }`,
          variables: { videoId },
        }),
      });

      const data = await response.json();

      if (data.errors && data.errors.length > 0) {
        for (const error of data.errors) {
          throw new ApolloError(error.message, 500);
        }
      } else if (!data.data) {
        throw new ApolloError(data.message, 500);
      }

      return data.data.deleteVideo;
    },
  },
};

module.exports = resolvers;
