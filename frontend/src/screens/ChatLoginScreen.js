import React from 'react'
import { useSelector } from 'react-redux';
import "../chat.css"

const ChatScreen = () => {
    // Check to see if the user is logged in
    const userLogin = useSelector(state => state.userLogin);
    // look at user reducer to know what is stored inside the state
    const {userInfo} = userLogin;

    console.log(userInfo)

    return (
		<div className="join-container">
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
                        placeholder={userInfo.name}
                        // value={userInfo.name}
                        required
					/>
					{/* <div className="form-control"> */}
                    <label htmlFor="room">Room</label>
                    <select name="room" id="room">
                        <option value="JavaScript">JavaScript</option>
                        <option value="Python">Python</option>
                        <option value="PHP">PHP</option>
                        <option value="C#">C#</option>
                        <option value="Ruby">Ruby</option>
                        <option value="Java">Java</option>
                    </select>
					{/* </div> */}
					<button type="submit" className="btn">Join Chat</button>
				</form>
			</main>
		</div>
    )
}

export default ChatScreen