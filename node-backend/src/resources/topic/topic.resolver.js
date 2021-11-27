const TopicService = require('./topic.service')

const resolvers = {

    Query: {    
        allTopic: async (_, args) => {
            return await TopicService.allTopic()
        }
    }
}

module.exports = resolvers