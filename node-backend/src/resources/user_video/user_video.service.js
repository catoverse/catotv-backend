const userVideoModel = require('./user_video.model')
const { ApolloError } = require('apollo-server')

class UserVideoService {
    userVideo = async (args, user) => {
        let document = await userVideoModel.findOne({ user_id: user.id, video_id: args.video.id})
        if (!document)
            throw new ApolloError("Resource not found", 404)

        return document
    }

    updateUserVideo = async (args, user) => {
        let document = await userVideoModel.findOne({ user_id: user.id, video_id: args.video.id})
        if (document) {
            Object.keys(args.userVideo).map(ele => {
                document[ele] = args[ele]
            })
            await document.save()
            return true

        } else {
            await userVideoModel.insert({ user_id: user.id, video_id: args.video_id, ...args.userVideo })
            return true
        }
    }

}

module.exports = new UserVideoService()