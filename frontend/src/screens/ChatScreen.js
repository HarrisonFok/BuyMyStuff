import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import io from "socket.io-client"
import { useEffect } from 'react';

let socket;
const CONNECTION = "localhost:3000/";

const ChatScreen = ({history, location}) => {
    // Check to see if the user is logged in
    const userLogin = useSelector(state => state.userLogin);
    // look at user reducer to know what is stored inside the state
    const {userInfo} = userLogin;
    let room = location.search.split("=")
    room = room[room.length-1]

    const [messageList, setMessageList] = useState([])
    
    useEffect(() => {
        socket = io(CONNECTION)
        // console.log("Connected: ", socket)
    })

    useEffect(() => {
        socket.on("receiveMessage", (data) => {
          console.log("receiveMessage socket: ", data)
          setMessageList([...messageList, data])
        })
        console.log("receiveMessage: ", messageList)
    })

    // Helper function to output message to DOM
    const outputMessage = async (message) => {
        const div = document.createElement("div")
        const today = new Date()
        // Add a class to the div
        div.classList.add("message")
        div.innerHTML = `<label class="meta"><span>${today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + "  " + today.getHours() + ':' + today.getMinutes()} </span>${userInfo.name}</label>
        <label class="text">
            ${message}
        </label>`
        // Add the div to the chat-messages div
        document.querySelector(".chat-messages").appendChild(div)
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        // Get message text
        const msg = e.target.elements.msg.value
        // console.log(msg)
        let messageObj = {
            room: room,
            content: {
              author: userInfo.name,
              message: msg
            }
        }	   
        await socket.emit("sendMessage", messageObj)
        // setMessageList([...messageList, messageObj.content])
        outputMessage(msg)
        // Clear input
        e.target.elements.msg.value = ""
        e.target.elements.msg.focus()
    }

    const leaveRoom = (e) => {
        e.preventDefault()
        history.push("/chatLogin")
    }

    return (
        <div className="chat-container">
            <header className="chat-header">
            <h1><i className="fas fa-smile"></i>Let's Chat!</h1>
            <a className="btn" onClick={leaveRoom}>Leave Room</a>
            </header>
            <main className="chat-main">
            <div className="chat-sidebar">
                <h3><i className="fas fa-comments"></i> Room Name:</h3>
                <h2 id="room-name">{room}</h2>
                <h3><i className="fas fa-users"></i> Users</h3>
                <ul id="users"></ul>
            </div>
            <div className="chat-messages">
            </div>
            </main>
            <div className="chat-form-container">
            <form id="chat-form" onSubmit={submitHandler}>
                <input
                id="msg"
                type="text"
                placeholder="Enter Message"
                required
                autoComplete="off"
                />
                <button className="btn"><i className="fas fa-paper-plane"></i> Send</button>
            </form>
            </div>
        </div>
    )
}

export default ChatScreen