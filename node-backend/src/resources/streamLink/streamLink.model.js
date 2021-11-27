const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    watchId: { type: String, required: true },
    url: { type: String, required: true },
    expire: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("streamLink", schema, "streamLinks");
