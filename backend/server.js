// Common JS, will move to ES modules later
import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectDB from './config/db.js';
// import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import {notFound, errorHandler} from "./middleware/errorMiddleware.js"
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config()

connectDB()

const app = express()

// only want this to run in development mode
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}

// in order to access json data in the req.body - body parser
app.use(express.json())

app.get("/", (req, res) => {
    res.send("API running...")
})

// Mount it -> for anything that goes to this, link to productRoutes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes)
app.use("/api/upload", uploadRoutes)

// When we're ready to make payment, hit this route and fetch the client id
app.get("/api/config/paypal", (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

// ES modules don't have __dirname (only available in common JS)
const __dirname = path.resolve()
// Make the uploads folder a static one so that it can get loaded in the browser
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

// Middlewares
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)); 

// Notes:
// Just by this alone, http://localhost:5000/api/products will contain all products
// Whenever you create .env, restart the server

let connectedUsers = []

// Get room users
const getRoomUsers = (room) => {
    return connectedUsers.filter(user => user.room === room)
}

// User leaves chat
const userLeave = (id) => {
    // console.log("userLeave: ", connectedUsers)
    // console.log("userLeave: ", id)
    const index = connectedUsers.findIndex(user => user.socketId === id)
    // console.log("userLeave: ", index)
    if (index !== -1) {
        // console.log(connectedUsers)
        return connectedUsers.splice(index, 1)
    }
}

const distinctUsers = (arr) => {
    let hash = {}, result = [];
    // console.log("distinctUsers arr: ", arr)
    for ( let i = 0, l = arr.length; i < l; ++i ) {
        if ( !hash.hasOwnProperty(arr[i].username) ) { 
            hash[ arr[i].username ] = true;
            result.push(arr[i]);
        }
    }
    // console.log("distinctUsers result: ", result)
    return result;
}

const getNamesList = (arr) => {
    let res = []
    for (let i=0; i < arr.length; ++i) {
        res.push(arr[i].username)
    }
    return res
}

const io = new Server(server)

io.on("connection", (socket) => {
    console.log(socket.id)

    socket.on("joinRoom", (data) => {
        const { username, room } = data
        socket.join(room)
        console.log(`user ${username} joined room ${room}`)
        connectedUsers.push({ username, socketId: socket.id })
        connectedUsers = distinctUsers(connectedUsers)
        const namesList = getNamesList(connectedUsers)
        // console.log("joinRoom connectedUsers: ", namesList)
        socket.emit("usersList", namesList)
        socket.broadcast.emit("broadcast", namesList)
    })

    socket.on("sendMessage", (data) => {
        console.log("sendMessage server: ", data)
        socket.to(data.room).emit("receiveMessage", data.content)
    })

    socket.on("disconnect", () => {
        console.log("User disconnected")
        const user = userLeave(socket.id)
        // console.log("disconnect user: ", user)
        if (user) {
            // Emit to everyone in the room
            io.to(user.room).emit("message", `${user[0].username} has left the chat`)

            // Send users and room info (want to take user away in the sidebar)
            io.to(user.room).emit("roomUsers", {
                room: user.room,
                users: getRoomUsers(user.room)
            })
        }
        socket.broadcast.emit("broadcast", getNamesList(connectedUsers))
    })
})