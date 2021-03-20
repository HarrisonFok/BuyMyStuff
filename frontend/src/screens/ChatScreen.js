import React, { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { addMessage, getMessages } from '../actions/messageActions';

const today = new Date()

const ChatScreen = ({room, socket, history}) => {
    const dispatch = useDispatch();

    // Check to see if the user is logged in
    const userLogin = useSelector(state => state.userLogin);
    // look at user reducer to know what is stored inside the state
    const { userInfo } = userLogin;

    const messageAll = useSelector(state => state.messageAll);
    const { messages } = messageAll;

    // const [messageList, setMessageList] = useState([])
    const [usersList, setUsersList] = useState([])

    // console.log("messages: ", messages)

    useEffect(() => {
        dispatch(getMessages(room))
        socket.on("receiveMessage", (data) => {
          //   console.log("receiveMessage socket: ", data)
          console.log("new message in, dispatching getMessages again")
          dispatch(getMessages(room))
          //   console.log("messages: ", messages)
        })
        socket.on("usersList", (data) => {
            console.log("useEffect usersList: ", data)
            setUsersList(data)
        })
        // console.log("usersList: ", usersList)
        socket.on("broadcast", (data) => {
            setUsersList(data)
        })
    }, [dispatch, room, socket])

    const ScrollToBottom = () => {
        const chatContainerRef = useRef()
        useEffect(() => chatContainerRef.current.scrollIntoView())
        return <div ref={chatContainerRef} />
    }

    // Helper function to output message to DOM
    const outputMessage = async (message) => {
        const div = document.createElement("div")
        // Add a class to the div
        div.classList.add("message")
        div.innerHTML = `<label class="meta">${userInfo.name}</label>
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
        outputMessage(msg)
        // Add the message to the database
        dispatch(addMessage(messageObj))
        // Clear input
        e.target.elements.msg.value = ""
        e.target.elements.msg.focus()
    }

    const leaveRoom = (e) => {
        e.preventDefault()
        socket.disconnect()
        history.push("/")
    }

    const listUsers = usersList.map((user) => 
        <li key={user} style={{color: "green"}}>{user}</li>
    )

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
                {listUsers}
            </div>
            <div className="chat-messages">
                {messages && messages.map((val,key) => {
                    return (
                        <div className="message" key={key}>
                            <label className="meta">{val.username}</label> {val.message}
                        </div>
                    )
                })}
                <ScrollToBottom />
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
