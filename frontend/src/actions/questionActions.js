import { QUESTIONS_LIST_REQUEST, QUESTIONS_LIST_SUCCESS, QUESTIONS_LIST_FAIL, QUESTIONS_ADD_REQUEST, QUESTIONS_ADD_SUCCESS, QUESTIONS_ADD_FAIL } from "../constants/questionConstants"
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