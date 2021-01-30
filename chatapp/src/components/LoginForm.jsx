import axios from "axios";
import { useState } from 'react';

const LoginForm = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const authObject = {"Project-ID": "89a5f4e9-5a8e-47cf-97e9-9270d3c314ff", "User-Name": username, "User-Secret": password}
        // Ask chat engine to give us back the messages
        try {
            // if works out -> logged in
            await axios.get("https://api.chatengine.io/chats", {headers: authObject})
            localStorage.setItem("username", username)
            localStorage.setItem("password", password)
            // reload page
            window.location.reload()
        } catch (error) {
            // if not -> prompt user to use it again
            setError("Incorrect credentials")
        }
    }

    return (
        <dvi className="wrapper">
            <div className="form">
                <h1 className="title">Chat Application</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="Username" required/>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" required/>
                    <div align="center">
                        <button type="submit" className="button">
                            <span>Start chatting</span>
                        </button>
                    </div>
                    <h2 className="error">{error}</h2>
                </form>
            </div>
        </dvi>
    )
}

export default LoginForm