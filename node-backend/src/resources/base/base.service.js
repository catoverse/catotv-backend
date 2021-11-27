const { ApolloError } = require("apollo-server");

const mongoose = require("mongoose");

const versionSchema = new mongoose.Schema({
  version: "String",
  required: "Boolean",
});
const Version = mongoose.model("version", versionSchema, "version");

class BaseService {
  getLatestVersion = async () => {
    try {
      return await Version.findOne();
    } catch (err) {
      throw new ApolloError(err.message, 500);
    }
  };
}

module.exports = new BaseService();
