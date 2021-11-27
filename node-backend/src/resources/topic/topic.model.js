const mongoose = require("mongoose")
const Schema = mongoose.Schema

var topicSchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true
    }
})

module.exports = mongoose.model("topic", topicSchema, 'topic');