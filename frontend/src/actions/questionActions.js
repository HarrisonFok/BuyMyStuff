import { QUESTIONS_LIST_REQUEST, QUESTIONS_LIST_SUCCESS, QUESTIONS_LIST_FAIL } from "../constants/questionConstants"
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