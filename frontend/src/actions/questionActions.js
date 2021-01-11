import { QUESTIONS_LIST_REQUEST, QUESTIONS_LIST_SUCCESS, QUESTIONS_LIST_FAIL, QUESTIONS_ADD_REQUEST, QUESTIONS_ADD_SUCCESS, QUESTIONS_ADD_FAIL, QUESTIONS_DELETE_REQUEST, QUESTIONS_DELETE_SUCCESS, QUESTIONS_DELETE_FAIL, QUESTIONS_EDIT_REQUEST, QUESTIONS_EDIT_SUCCESS, QUESTIONS_EDIT_FAIL } from "../constants/questionConstants"
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
    console.log(body)
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