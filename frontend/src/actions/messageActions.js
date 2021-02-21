import { MESSAGE_CREATE_REQUEST, MESSAGE_CREATE_SUCCESS, MESSAGE_CREATE_FAIL } from '../constants/messageConstants';
import axios from "axios";

export const addMessage = (msg) => async(dispatch, getState) => {
    console.log("Got here msg: ", msg)
    try {
        dispatch({
            type: MESSAGE_CREATE_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        // Send in header
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        // user is the data we want to update with
        const { data } = await axios.post(`api/messages/`, msg, config)

        dispatch({
            type: MESSAGE_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: MESSAGE_CREATE_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
} 