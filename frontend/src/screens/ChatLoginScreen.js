import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import "../chat.css"
import io from "socket.io-client"
import ChatScreen from './ChatScreen';

let socket;
const CONNECTION = "localhost:3000/";

const ChatLoginScreen = ({history}) => {
    const [room, setRoom] = useState("JavaScript")
    const [username, setUsername] = useState("")
    const [isLoggedIn, setIsLoggedIn] = useState(false)
  
    useEffect(() => {
      socket = io(CONNECTION)
      console.log(socket)
    }, [CONNECTION])
  
    const connectToRoom = () => {
      socket.emit("joinRoom", { username, room })
      setIsLoggedIn(true)
    }

    return (
        !isLoggedIn ?
		(<div className="join-container">
			<header className="join-header">
				<h1><i className="fas fa-smile"></i>Let's Chat!</h1>
			</header>
			<main className="join-main">
				<form action="chat.html">
					{/* <div className="form-control"> */}
					<label htmlFor="username">Username</label>
					{/* </div> */}
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder={username}
                        onChange={(e) => {setUsername(e.target.value)}}
                        required
					/>
					{/* <div className="form-control"> */}
                    <label htmlFor="room">Room</label>
                    <select name="room" id="room" onChange={(e) => {setRoom(e.target.value)}}>
                        <option value="JavaScript">JavaScript</option>
                        <option value="Python">Python</option>
                        <option value="PHP">PHP</option>
                        <option value="C#">C#</option>
                        <option value="Ruby">Ruby</option>
                        <option value="Java">Java</option>
                    </select>
					{/* </div> */}
					<button type="submit" className="btn" onClick={connectToRoom}>Join Chat</button>
				</form>
			</main>
		</div>) :
        (
            <ChatScreen room={room} socket={socket} history={history}/>
        )
    )
}

export default ChatLoginScreen