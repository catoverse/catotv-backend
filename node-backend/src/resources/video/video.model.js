const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var videoSchema = new Schema(
  {
    top: {
      type: "Boolean",
      default: false,
    },
    title: {
      type: "String",
      required: true,
    },
    source: {
      type: "String",
    },
    video_url: {
      type: "String",
      required: true,
    },
    topics: [
      {
        type: "ObjectId",
        ref: "topic",
      },
    ],
    start_timestamp: {
      type: "Number",
      required: true,
    },
    end_timestamp: {
      type: "Number",
      required: true,
    },
    available: {
      type: "Boolean",
      default: true,
    },
    added_by: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    channel_information: {
      id: {
        type: "String",
      },
      name: {
        type: "String",
      },
      subscriber_count: {
        type: "Number",
      },
      thumbnails: {
        default: {
          url: {
            type: "String",
          },
          width: {
            type: "Number",
          },
          height: {
            type: "Number",
          },
        },
        medium: {
          url: {
            type: "String",
          },
          width: {
            type: "Number",
          },
          height: {
            type: "Number",
          },
        },
        high: {
          url: {
            type: "String",
          },
          width: {
            type: "Number",
          },
          height: {
            type: "Number",
          },
        },
        standard: {
          url: {
            type: "String",
          },
          width: {
            type: "Number",
          },
          height: {
            type: "Number",
          },
        },
        maxres: {
          url: {
            type: "String",
          },
          width: {
            type: "Number",
          },
          height: {
            type: "Number",
          },
        },
      },
    },
    tags: {
      type: ["String"],
    },
    video_id: {
      type: "String",
    },
    comments_analysis: {
      comments_available: {
        type: "Boolean",
      },
      negative_comments: {
        type: "Number",
      },
      negativity_ratio: {
        type: "Number",
      },
      positive_comments: {
        type: "Number",
      },
      positivity_ratio: {
        type: "Number",
      },
      total_comments: {
        type: "Number",
      },
    },
    content_details: {
      thumbnails: {
        default: {
          url: {
            type: "String",
          },
          width: {
            type: "Number",
          },
          height: {
            type: "Number",
          },
        },
        medium: {
          url: {
            type: "String",
          },
          width: {
            type: "Number",
          },
          height: {
            type: "Number",
          },
        },
        high: {
          url: {
            type: "String",
          },
          width: {
            type: "Number",
          },
          height: {
            type: "Number",
          },
        },
        standard: {
          url: {
            type: "String",
          },
          width: {
            type: "Number",
          },
          height: {
            type: "Number",
          },
        },
        maxres: {
          url: {
            type: "String",
          },
          width: {
            type: "Number",
          },
          height: {
            type: "Number",
          },
        },
      },
      youtube_category: {
        type: "Number",
      },
      captions_available: {
        type: "Boolean",
      },
      dislikes: {
        type: "Number",
      },
      duration: {
        type: "Number",
      },
      likes: {
        type: "Number",
      },
      views: {
        type: "Number",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("video", videoSchema, "video");
