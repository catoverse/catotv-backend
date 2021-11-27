const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    google_id: {
      type: String,
      unique: true,
      index: true,
    },
    apple_id: {
      type: String,
      unique: true,
      index: true,
    },
    avatar: {
      type: String,
    },
    google_token: {
      type: String,
    },
    type: String,
    role: { type: String, default: "USER" },
    invites: {
      type: Number,
      default: 5,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", UserSchema, "user");
