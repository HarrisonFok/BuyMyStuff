import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL } from '../constants/userConstants';
import axios from 'axios';

export const login = (email, password) => async(dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        // Send in header
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        // Log in the user - look at userController.js to see what kind of data you'll get
        const { data } = await axios.post("api/users/login", {email, password}, config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        // Set userInfo in local storage
        localStorage.setItem("userInfo", JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
} 

export const logout = () => dispatch => {
    localStorage.removeItem("userInfo");
    dispatch({type: USER_LOGOUT})
} 

export const register = (name, email, password) => async(dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        // Send in header
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        // Add the user
        const { data } = await axios.post("api/users/", {name, email, password}, config)

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        // Log the user in right away after registration
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        // Set in local storage
        localStorage.setItem("userInfo", JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
} 