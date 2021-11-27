const TopicModel = require('./topic.model')
const { ApolloError } = require('apollo-server')

class TopicService {
    allTopic = async () => {
        try {
            return await TopicModel.find() 
            
        } catch (err) {
            console.log(err)
            throw err
        }
    }
}

module.exports = new TopicService()