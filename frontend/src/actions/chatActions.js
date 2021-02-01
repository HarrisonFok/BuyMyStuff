import axios from 'axios';
import { addPerson } from "react-chat-engine"
import { CHAT_LOGIN_REQUEST, CHAT_LOGIN_SUCCESS, CHAT_LOGIN_FAIL } from '../constants/chatLoginConstants';

export const chatLogin = () => async(dispatch, getState) => {
    try {
        dispatch({
            type: CHAT_LOGIN_REQUEST
        })

        const {userLogin: {userInfo}} = getState()
        const { email, token, name } = userInfo

        addPerson({email: email, token: token}, '6b51eb52-d5e9-4137-b68c-bc43cdd14c9c', name)

        dispatch({
            type: CHAT_LOGIN_SUCCESS,
            payload: "went to chat app"
        })

        window.location.assign("http://localhost:3001")
    } catch (error) {
        dispatch({
            type: CHAT_LOGIN_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
} 