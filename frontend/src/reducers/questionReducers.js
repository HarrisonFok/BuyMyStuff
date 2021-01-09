import { QUESTIONS_LIST_REQUEST, QUESTIONS_LIST_SUCCESS, QUESTIONS_LIST_FAIL } from "../constants/questionConstants"

export const questionsReducer = (state = { questions: [] }, action) => {
    switch(action.type) {
        case QUESTIONS_LIST_REQUEST:
            // questions is an empty array because it hasn't been fulfilled yet
            return { loading: true, questions: [] }
        case QUESTIONS_LIST_SUCCESS:
            return { loading: false, questions: action.payload }
        case QUESTIONS_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}