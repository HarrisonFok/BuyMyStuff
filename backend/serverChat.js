// const path = require("path")
// const http = require("http")
// const express = require("express")
// const socketio = require("socket.io")
// const formatMessage = require("./utils/messages")
// const {userJoin, getCurrentUser, userLeave, getRoomUsers} = require("./utils/users")

import path from "path";
import http from "http";
import express from "express";
import { io as socketio} from "socket.io-client";
import formatMessage from "../frontend/utils/messages.js";
import userJoin from "../frontend/utils/users.js";
import getCurrentUser from "../frontend/utils/users.js";
import userLeave from "../frontend/utils/users.js";
import getRoomUsers from "../frontend/utils/users.js";

const app = express()
const server = http.createServer(app)
const io = socketio(server)

// only want this to run in development mode
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}

// Set static folder
const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, "../frontend/public")))

const botname = "Chatcord bot"

// Run when client connects
io.on("connection", socket => {
    socket.on("joinRoom", ({username, room}) => {
        const user = userJoin(socket.id, username, room)

        socket.join(user.room)

        // Welcome the current user
        socket.emit("message", formatMessage(botname, "Welcome to Chatcord!"))

        // Broadcast when a user connects (emit to everything else but the user that's emitting)
        // - needs to broadcast to the room
        socket.broadcast.to(user.room).emit("message", formatMessage(botname, `${user.username} has joined the chat`))

        // Send users and room info
        io.to(user.room).emit("roomUsers", {
            room: user.room,
            users: getRoomUsers(user.room)
        })
    })

    // Listen for chatMessage
    socket.on("chatMessage", (msg) => {
        const user = getCurrentUser(socket.id)
        // Want to emit the message back to the client (or simply everybody)
        io.to(user.room).emit("message", formatMessage(user.username, msg))
    })

    // Runs when client disconnects
    socket.on("disconnect", () => {
        const user = userLeave(socket.id)
        if (user) {
            // Emit to everyone in the room
            io.to(user.room).emit("message", formatMessage(botname, `${user.username} has left the chat`))

            // Send users and room info (want to take user away in the sidebar)
            io.to(user.room).emit("roomUsers", {
                room: user.room,
                users: getRoomUsers(user.room)
            })
        }
    })
})

const PORT = 2000 

server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})