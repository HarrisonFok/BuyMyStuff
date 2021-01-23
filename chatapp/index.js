const db = {
    users: [
        {id: "1", email: "a@a.com", name: "A"},
        {id: "2", email: "b@a.com", name: "B"},
    ]
}

const express = require("express")

const app = express()

app.listen(3000, () => console.log("Listening to port 3000"))
const {graphql, buildSchema} = require("graphql");

const schema = buildSchema(`
    type Query {
        users: [User!]!
    }
    type User {
        id: ID!
        email: String!
        name: String
        avatarUrl: String
    }
`)

// To actually return something for the message, need a resolver function
const rootValue = {
    users: () => db.users
}

graphql(
    schema,
    `
        {
            users {
                email
            } 
        }
    `,
    rootValue
).then(
    res => console.dir(res, {depth: null})
).catch(
    console.error
)