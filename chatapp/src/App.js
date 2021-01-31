import { ChatEngine } from "react-chat-engine";
import "./App.css";

import ChatFeed from "./components/ChatFeed";
// import LoginForm from "./components/LoginForm";

const App = () => {
    // if (!localStorage.getItem("username")) return <LoginForm />
    return (
        <ChatEngine 
            height="100vh"
            projectID="89a5f4e9-5a8e-47cf-97e9-9270d3c314ff"
            // userName={localStorage.getItem("username")}
            // userSecret={localStorage.getItem("password")}
            renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
        />
    )
}

export default App;