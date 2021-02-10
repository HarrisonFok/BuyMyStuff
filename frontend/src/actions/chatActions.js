import axios from 'axios';
import { CHAT_LOGIN_REQUEST, CHAT_LOGIN_SUCCESS, CHAT_LOGIN_FAIL } from '../constants/chatLoginConstants';

export const chatLogin = (email, password, firstName, lastName) => async(dispatch, getState) => {
    dispatch({
        type: CHAT_LOGIN_REQUEST
    })

    const {userLogin: {userInfo}} = getState()

    console.log(email)
    console.log(password)
    console.log(firstName)
    console.log(lastName)

    axios.post(
        'https://api.chatengine.io/peojects/people/',
        { 'username': email, 'secret': password, 'first_name': firstName, 'last_name': lastName},
        { headers: { "Private-Key": '6b51eb52-d5e9-4137-b68c-bc43cdd14c9c' } }
    )
    .then((response) => {
        console.log(response)
        dispatch({
            type: CHAT_LOGIN_SUCCESS,
            payload: "went to chat app"
        })
    })
    .catch((error) => {
        console.log(error)
        dispatch({
            type: CHAT_LOGIN_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    })
} 

