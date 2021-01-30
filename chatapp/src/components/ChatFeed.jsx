import MessageForm from './MessageForm';
import MyMessage from './MyMessage';
import TheirMessage from './TheirMessage';

const ChatFeed = (props) => {
    /*
    {height: "100vh", projectID: "89a5f4e9-5a8e-47cf-97e9-9270d3c314ff", userName: "alice", userSecret: "alice", renderChatFeed: ƒ, …}
    activeChat: 737
    chats: {737: {…}}
    creds: undefined
    height: "100vh"
    messages:
    1670: {id: 1670, sender: {…}, created: "2021-01-30 17:33:42.138518+00:00", attachments: Array(0), text: "hi"}
    __proto__: Object
    projectID: "89a5f4e9-5a8e-47cf-97e9-9270d3c314ff"
    renderChatFeed: chatAppProps => {…}
    typingCounter: {}
    typingData: {}
    userName: "alice"
    userSecret: "alice"
    __proto__: Object
    */
    const { chats, activeChat, userName, messages } = props

    const chat = chats && chats[activeChat]

    const renderReadReceipts = (message, isMyMessage) => {
        // map over people who read that message
        chat.people.map((person, index) => person.last_read === message.id && (
            <div 
                key={`read_${index}`} 
                className="read-receipt" 
                style={{
                    float: isMyMessage ? "right" : "left",
                    backgroundImage: `url(${person?.person?.avatar})`
                }}
            />
        ))
    }

    const renderMessages = () => {
        const keys = Object.keys(messages)
        return keys.map((key, index) => {
            const message = messages[key]
            const lastMsgKey = index === 0 ? null : keys[index-1]
            const isMyMessage = userName === message.sender.username

            return (
                <div key={`msg_${index}`} style={{width: "100%"}}>
                    <div className="message-block">
                        {
                            isMyMessage 
                            ? <MyMessage message={message}/> 
                            : <TheirMessage message={message} lastMessage={messages[lastMsgKey]}/>
                        }
                    </div>
                    <div className="read-receipts" style={{marginRight: isMyMessage ? "18px" : "0px", marginLeft: isMyMessage ? "0px" : "68px"}}>
                        {renderReadReceipts(message, isMyMessage)}
                    </div>
                </div>
            )
        })
    }

    if (!chat) return "Loading..."

    return (
        <div className="chat-feed">
            <div className="chat-title-container">
                <div className="chat-title">{chat.title }</div>
                <div className="chat-subtitle">{chat.people.map((person) => `${person.person.username}`)}</div>
            </div>
            {renderMessages()}
            <div style={{height: "100px"}} />
            <div className="message-form-container">
                <MessageForm {...props} chatId={activeChat}/>
            </div>
        </div>
    )
}

export default ChatFeed;