import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_DETAILS_RESET, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL, USER_LIST_RESET, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL } from '../constants/userConstants';
import { ORDER_LIST_MY_RESET } from "../constants/orderConstants"
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
    localStorage.removeItem("userInfo")
    localStorage.removeItem("paymentMethod")
    localStorage.removeItem("cartItems")
    localStorage.removeItem("shippingAddress")
    dispatch({type: USER_LOGOUT})
    // Reset these two so that when another user logs in, they won't see them
    dispatch({type: USER_DETAILS_RESET})
    dispatch({type: ORDER_LIST_MY_RESET})
    dispatch({type: USER_LIST_RESET})
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

// need to send token, so we need getState (can get the user info)
export const getUserDetails = (id) => async(dispatch, getState) => {
    // id might be profile, but they're very similar
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        // Send in header
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        // Get the user details
        const { data } = await axios.get(`api/users/${id}`, config)

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
} 

// need to send token, so we need getState (can get the user info)
export const updateUserProfile = (user) => async(dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
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
        const { data } = await axios.put(`api/users/profile`, user, config)

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
} 

export const listUsers = () => async(dispatch, getState) => {
    try {
        dispatch({
            type: USER_LIST_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        // Send in header (get token)
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        // user is the data we want to update with
        const { data } = await axios.get(`/api/users/`, config)

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
} 

export const deleteUser = (id) => async(dispatch, getState) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        // Send in header
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        // user is the data we want to update with
        await axios.delete(`/api/users/${id}`, config)

        dispatch({type: USER_DELETE_SUCCESS})
    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
} 

export const updateUser = (user) => async(dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST
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
        const {data} = await axios.put(`/api/users/${user._id}`, user,  config)

        dispatch({type: USER_UPDATE_SUCCESS})
        // pass the updated user into the user details
        dispatch({type: USER_DETAILS_SUCCESS, payload: data})
    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
} 