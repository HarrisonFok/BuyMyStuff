import { QUESTIONS_LIST_REQUEST, QUESTIONS_LIST_SUCCESS, QUESTIONS_LIST_FAIL, QUESTIONS_ADD_REQUEST, QUESTIONS_ADD_SUCCESS, QUESTIONS_ADD_FAIL, QUESTIONS_DELETE_REQUEST, QUESTIONS_DELETE_SUCCESS, QUESTIONS_DELETE_FAIL, QUESTIONS_EDIT_REQUEST, QUESTIONS_EDIT_SUCCESS, QUESTIONS_EDIT_FAIL, QUESTIONS_ALL_REQUEST, QUESTIONS_ALL_SUCCESS, QUESTIONS_ALL_FAIL, QUESTIONS_REPLY_REQUEST, QUESTIONS_REPLY_SUCCESS, QUESTIONS_REPLY_FAIL, QUESTIONS_SINGLE_REQUEST, QUESTIONS_SINGLE_SUCCESS, QUESTIONS_SINGLE_FAIL, QUESTIONS_ALL_COMMENTS_REQUEST, QUESTIONS_ALL_COMMENTS_SUCCESS, QUESTIONS_ALL_COMMENTS_FAIL } from "../constants/questionConstants"
import axios from "axios";

// same as what we did for the useEffect() at first 
export const listQuestions = (id) => async(dispatch) => {
    try {
        dispatch({type: QUESTIONS_LIST_REQUEST})

        const res = await axios.get(`/api/users/${id}/questions`)
        
        dispatch({
            type: QUESTIONS_LIST_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: QUESTIONS_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const addQuestion = (id, question) => async(dispatch) => {
    try {
        dispatch({type: QUESTIONS_ADD_REQUEST})

        const res = await axios.post(`/api/users/${id}/questions`, question)
        
        dispatch({
            type: QUESTIONS_ADD_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: QUESTIONS_ADD_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const deleteQuestion = (userId, qId) => async(dispatch) => {
    try {
        dispatch({type: QUESTIONS_DELETE_REQUEST})

        const res = await axios.delete(`/api/users/${userId}/questions/${qId}`)
        
        dispatch({
            type: QUESTIONS_DELETE_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: QUESTIONS_DELETE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const editQuestion = (userId, qId, question) => async(dispatch) => {
    const body = {question: question}
    try {
        dispatch({type: QUESTIONS_EDIT_REQUEST})

        const res = await axios.put(`/api/users/${userId}/questions/${qId}`, {question: question})
        
        dispatch({
            type: QUESTIONS_EDIT_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: QUESTIONS_EDIT_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const getAllQuestions = () => async(dispatch, getState) => {
    try {
        dispatch({type: QUESTIONS_ALL_REQUEST})

        const {userLogin: {userInfo}} = getState()
  
        // Send in header
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const res = await axios.get(`/api/users/questionsList`, config)
        
        dispatch({
            type: QUESTIONS_ALL_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: QUESTIONS_ALL_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const getSingleQuestion = (qId) => async(dispatch, getState) => {
    try {
        dispatch({type: QUESTIONS_SINGLE_REQUEST})

        const {userLogin: {userInfo}} = getState()
  
        // Send in header
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const res = await axios.get(`/api/users/questionsList/${qId}`, config)
        
        dispatch({
            type: QUESTIONS_SINGLE_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: QUESTIONS_SINGLE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const replyQuestion = (qId, reply) => async(dispatch, getState) => {
    try {
        dispatch({type: QUESTIONS_REPLY_REQUEST})

        const {userLogin: {userInfo}} = getState()
  
        // Send in header
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const res = await axios.post(`/api/users/questionsList/${qId}`, reply, config)
        
        dispatch({
            type: QUESTIONS_REPLY_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: QUESTIONS_REPLY_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const getAllComments = (qId) => async(dispatch, getState) => {
    try {
        dispatch({type: QUESTIONS_ALL_COMMENTS_REQUEST})

        const res = await axios.get(`/api/users/questionsList/${qId}/comments`)
        
        dispatch({
            type: QUESTIONS_ALL_COMMENTS_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: QUESTIONS_ALL_COMMENTS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}