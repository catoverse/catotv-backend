const { gql } = require('apollo-server-express')

const typeDefs  = gql`
    
    type UserProfile {
        topics: [Topic]!
    }

    input UserProfileInput {
        topics: [ID!]!
    }

    extend type Query {
        userProfile: UserProfile! @isAuth
    }

    extend type Mutation {
        createUserProfile(profile: UserProfileInput!): UserProfile @isAuth
        updateUserProfile(profile: UserProfileInput!): UserProfile @isAuth
    }
`

module.exports = typeDefs