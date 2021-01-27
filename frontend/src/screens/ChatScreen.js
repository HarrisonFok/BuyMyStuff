import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { runChatApp } from '../actions/chatActions';

const ChatScreen = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(runChatApp())
    })

    return (
        <div>
            Chat Screen
        </div>
    )
}

export default ChatScreen
