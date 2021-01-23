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

class User {
    constructor(user){
        Object.assign(this, user)
    }
    get messages() {
        return db.messages.filter(message => message.userId === this.id)
    }
}

const express = require("express")
// Hook up graphql and express
const { graphqlHTTP } = require("express-graphql")
const { buildSchema } = require("graphql")
const crypto = require("crypto")

// Mutation create actions
const schema = buildSchema(`
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
`)

// To actually return something for the message, need a resolver function
const rootValue = {
    users: () => db.users.map(user => new User(user)),
    user: ({id}) => db.users.find(user => user.id === id),
    messages: () => db.messages,
    addUser: ({email, name}) => {
        const user = {
            id: crypto.randomBytes(10).toString("hex"),
            email,
            name
        }
        db.users.push(user)
        return user
    }
}

const app = express()

app.use("/graphql", graphqlHTTP({
    schema,
    rootValue,
    graphiql: true
}))

app.listen(3000, () => console.log("Listening to port 3000"))

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
*/