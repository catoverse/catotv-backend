const UserVideoService = require('./user_video.service')

const resolvers = {

    Query: {
        userVideo: async (_, args, { user }) => {
            return await UserVideoService.userVideo(args, user)
        }
    },

    Mutation : {
        updateUserVideo: async (_, args, { user }) => {
            return await UserVideoService.updateUserVideo(args, user)
        }
    }
}

module.exports = resolvers