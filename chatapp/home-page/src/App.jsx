import React from "react";
import ReactDOM from "react-dom";
import { Container } from 'shards-react';

import "bootstrap/dist/css/bootstrap.min.css"
import "shards-ui/dist/css/shards.min.css"

import "./index.css";

// chat is the remote name of the client
import Chat from "chat/Chat"

const App = () => (
    <Container>
        <p>Yo man!</p>
        <h1>Chat!</h1>
        <Chat />
        <p>Yo dude!</p>
    </Container>
);

ReactDOM.render(<App />, document.getElementById("app"));
