const { gql } = require('apollo-server-express')

const typeDefs  = gql`
    
    type UserVideo {
        user_id: ID!
        video_id: ID!
        like: Boolean
        skip: Boolean
        percent_completed: Int
        name: String
        status: String
    }

    input UserVideoInput {
        like: Boolean
        skip: Boolean
        percent_completed: Int
        name: String
        status: String
    }

    extend type Query {
        userVideo(video_id: ID!): UserVideo @isAuth
    }

    extend type Mutation {
        updateUserVideo(video_id: ID!, userVideo: UserVideoInput!): Boolean @isAuth
    }
`

module.exports = typeDefs