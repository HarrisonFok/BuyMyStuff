const { GraphQLServer, PubSub } = require("graphql-yoga")

const messages = []

const typeDefs = `
    type Message {
        id: ID!
        user: String!
        content: String!
    }

    type Query {
        messages: [Message!]
    }

    type Mutation {
        postMessage(user: String!, content: String!): ID!
    }

    type Subscription {
        messages: [Message!]
    }
`

const subscribers = []
const onMessagesUpdates = (fn) => subscribers.push(fn)

// Mutation is equivalent to POST

// How to actually get the data
// - match the keys that are in the type definitions
const resolvers = {
    Query: {
        messages: () => messages
    },
    Mutation: {
        postMessage: (parent, {user, content}) => {
            const id = messages.length
            messages.push({
                id,
                user,
                content,
            })
            // alert the system of the new messages
            subscribers.forEach(fn => fn())
            return id
        }
    },
    Subscription: {
        messages: {
            subscribe: (parent, args, { pubsub }) => {
                // Define a new random channel
                const channel = Math.random().toString(36).slice(2,15)
                onMessagesUpdates(() => pubsub.publish(channel, { messages }))
                setTimeout(() => pubsub.publish(channel, { messages }), 0)
                return pubsub.asyncIterator(channel)
            }
        }
    }
}

const pubsub = new PubSub()
const server = new GraphQLServer({typeDefs, resolvers, context: {pubsub}})
server.start(({port}) => {
    console.log(`Server running on http://localhost:${port}/`)
})