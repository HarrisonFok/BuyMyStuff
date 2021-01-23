const { ApolloServer, gql } = require("apollo-server")

const crypto = require("crypto")

const db = {
    users: [
        {id: "1", email: "a@a.com", name: "A", avatarUrl: "https://google.com"},
        {id: "2", email: "b@a.com", name: "B", avatarUrl: "https://google.com"},
    ],
    messages: [
        {id: "1", userId: "1", body: "hello", createdAt: Date.now()},
        {id: "2", userId: "2", body: "hi", createdAt: Date.now()},
        {id: "3", userId: "1", body: "sup", createdAt: Date.now()},
    ]
}

// Mutation create actions
const typeDefs = gql`
    type Query {
        users: [User!]!
        user(id: ID!): User
        messages: [Message!]!
    }

    type Mutation {
        addUser(email: String!, name: String): User
    }

    type User {
        id: ID!
        email: String!
        name: String
        avatarUrl: String
        messages: [Message!]!
    }

    type Message {
        id: ID!
        body: String!
        createdAt: String
    }
`

// To actually return something for the message, need a resolver function
const resolvers = {
    // where you define the top-level resolvers
    Query: {
        users: () => db.users,
        user: (root, {id}) => db.users.find(user => user.id === id),
        messages: () => db.messages,
    },
    Mutation: {
        addUser: (root, {email, name}) => {
            const user = {
                id: crypto.randomBytes(10).toString("hex"),
                email,
                name
            }
            db.users.push(user)
            return user
        }
    },
    // With Apollo server, you can create nested types
    User: {
        messages: (user) => {
            // Root object will be the user because the user is getting resolved on the users collection
            return db.messages.filter(message => message.userId === user.id)
        }
    }
}

const server = new ApolloServer({typeDefs, resolvers})

server.listen().then(({url}) => console.log(url))

/*
// On Graphiql

{
  users {
    id
    email
    avatarUrl
  }
}

mutation {
  addUser(email: "a@a.com") {
    id
    email
    name
  }
}

{
  user(id:1){
    email
    id
  }
}

query getUser($id: ID!) {
    user(id:$id){
      email
      id
    }
  }

{
  users {
    id
    email
    name
    messages {
      id
      body
      createdAt
    }
  }
}

{
  user(id:1){
    id
    name
    messages{
      body
      createdAt
    }
  }
}
*/