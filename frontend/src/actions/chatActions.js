import axios from 'axios';
import { GET_CHAT, GET_CHAT_SUCCESS, GET_CHAT_FAIL } from '../constants/chatConstants';

export const runChatApp = () => async(dispatch, getState) => {
    console.log("Got here")
    try {
        dispatch({
            type: GET_CHAT
        })

        const {userLogin: {userInfo}} = getState()

        // Send in header
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`api/letsChat/letsChat/`, config)

        dispatch({
            type: GET_CHAT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_CHAT_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

/*
const util = require('util');
const exec = util.promisify(require('child_process').exec);

    async function innerRunChatApp() {
        try {
            const { stdout, stderr } = await exec('npm run chatDev');
            console.log('stdout:', stdout);
            console.log('stderr:', stderr);
        }catch (err) {
           console.error(err);
        };
    }
    innerRunChatApp()
*/