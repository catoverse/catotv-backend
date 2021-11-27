const mongoose = require("mongoose")
const Schema = mongoose.Schema

var userVideoSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        require: true,
        unique: true,
        ref: 'user'
    },
    video_id: {
        type: Schema.Types.ObjectId,
        ref: 'video'
    },
    name: String,
    like: Boolean,
    percent_completed: Number,
    skip: Boolean,
    status: String  
},
{ 
	timestamps: true
})

module.exports = mongoose.model('user_video', userVideoSchema, 'user_video')