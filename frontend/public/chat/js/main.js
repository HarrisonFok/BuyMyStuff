const chatForm = document.getElementById("chat-form")
const chatMessages = document.querySelector(".chat-messages")
const roomName = document.getElementById("room-name")
const userList = document.getElementById("users")

// Get username and room from url
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

// We have access to io() because of the script tag added in chat.html
const socket = io()

// Join chat room
socket.emit("joinRoom", {username, room})

// Get room and users
socket.on("roomUsers", ({room, users}) => {
    // Output these stuff
    outputRoomName(room)
    outputUsers(users)
})

// Message from server
socket.on("message", message => {
    console.log(message)
    outputMessage(message)

    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight
})

// Message submit 
chatForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get message text
    const msg = e.target.elements.msg.value
    
    // Emitting a message to the server
    socket.emit("chatMessage", msg)

    // Clear input
    e.target.elements.msg.value = ""
    e.target.elements.msg.focus()
})

// Output message to DOM
const outputMessage = (message) => {
    const div = document.createElement("div")
    // Add a class to the div
    div.classList.add("message")
    div.innerHTML = `<p class="meta">${message.username}<span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`
    // Add the div to the chat-messages div
    document.querySelector(".chat-messages").appendChild(div)
}

// Output room name to DOM
const outputRoomName = (room) => {
    roomName.innerText = room
}

// Output users to DOM
const outputUsers = (users) => {
    userList.innerHTML = `
        ${users.map(user => `<li>${user.username}</li>`).join('')}
    `
}