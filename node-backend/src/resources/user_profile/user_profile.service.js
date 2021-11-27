const UserProfileModel = require('./user_profile.model')
const { ApolloError } = require('apollo-server')
const mongoose = require('mongoose')

class UserProfileService {
    userProfile = async (id) => {
        try {
            let result = await UserProfileModel.aggregate([
                {
                    $match: { user_id: mongoose.Types.ObjectId(id) }
                },
                {
                    $lookup: {
                        from: "topic",
                        localField: "topics",
                        foreignField: "_id",
                        as: "topics"
                    }
                }  
            ])
            if (!result.length) {
                throw new ApolloError("User profile not found", 404)
            }
            result[0].topics = result[0].topics.map(ele => {
                return { id: ele._id, name: ele.name }
            })
            return result[0]

        } catch (err) {
            console.log(err)
            throw err
        }
    }

    createUserProfile = async (user_id, body) => {
        try {
            let doc = await UserProfileModel.findOne({ user_id })
            if (doc) {
                throw new ApolloError("User profile already exists", 400)
            }

            let newProfile = new UserProfileModel({ user_id })
            newProfile.topics = body.topics
            newProfile.video_index = 0
            await newProfile.save()
            
            return await this.userProfile(user_id)
            
        } catch (err) {
            console.log(err)
            throw err
        }
    }

    updateUserProfile = async (user_id, body) => {
        try {
            let profile = await UserProfileModel.findOne({ user_id })
            if (!profile) {
                throw new ApolloError("User profile does not exists", 400)
            }

            profile.topics = body.topics
            profile.video_index = 0
            await profile.save()

            return await this.userProfile(user_id)

        } catch (err) {
            console.log(err)
            throw err
        }
    }

}

module.exports = new UserProfileService()