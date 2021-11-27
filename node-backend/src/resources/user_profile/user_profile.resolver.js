const UserProfileService = require("./user_profile.service")

const resolvers = {

    Query: {
        userProfile: async (_, args, { user }) => {
            return await UserProfileService.userProfile(user.id)
        }
    },

    Mutation : {
        createUserProfile: async (_, args, { user }) => {
            return await UserProfileService.createUserProfile(user.id, args.profile)
        },

        updateUserProfile: async (_, args, { user }) => {
            return await UserProfileService.updateUserProfile(user.id, args.profile)
        }
    }
}

module.exports = resolvers