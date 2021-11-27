const mongoose = require("mongoose")
const Schema = mongoose.Schema

var userProfile = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        require: true,
        unique: true,
        ref: 'user'
    },
    topics: [{
        type: Schema.Types.ObjectId,
        ref: 'topic'
    }],
    video_index: Number
},
{ 
	timestamps: true
})

module.exports = mongoose.model('user_profile', userProfile, 'user_profile')