import { QUESTIONS_LIST_REQUEST, QUESTIONS_LIST_SUCCESS, QUESTIONS_LIST_FAIL, QUESTIONS_ADD_REQUEST, QUESTIONS_ADD_SUCCESS, QUESTIONS_ADD_FAIL, QUESTIONS_DELETE_REQUEST, QUESTIONS_DELETE_SUCCESS, QUESTIONS_DELETE_FAIL, QUESTIONS_EDIT_REQUEST, QUESTIONS_EDIT_SUCCESS, QUESTIONS_EDIT_FAIL, QUESTIONS_ALL_REQUEST, QUESTIONS_ALL_SUCCESS, QUESTIONS_ALL_FAIL, QUESTIONS_REPLY_REQUEST, QUESTIONS_REPLY_SUCCESS, QUESTIONS_REPLY_FAIL, QUESTIONS_ALL_COMMENTS_REQUEST, QUESTIONS_ALL_COMMENTS_SUCCESS, QUESTIONS_ALL_COMMENTS_FAIL } from "../constants/questionConstants"

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

export const questionsAddReducer = (state = { questions: [] }, action) => {
    switch(action.type) {
        case QUESTIONS_ADD_REQUEST:
            // questions is an empty array because it hasn't been fulfilled yet
            return { loading: true, questions: [] }
        case QUESTIONS_ADD_SUCCESS:
            return { loading: false, questions: action.payload }
        case QUESTIONS_ADD_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const questionsDeleteReducer = (state = { questions: [] }, action) => {
    switch(action.type) {
        case QUESTIONS_DELETE_REQUEST:
            // questions is an empty array because it hasn't been fulfilled yet
            return { loading: true, questions: [] }
        case QUESTIONS_DELETE_SUCCESS:
            return { loading: false, questions: action.payload }
        case QUESTIONS_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const questionsEditReducer = (state = { questions: [] }, action) => {
    switch(action.type) {
        case QUESTIONS_EDIT_REQUEST:
            // questions is an empty array because it hasn't been fulfilled yet
            return { loading: true, questions: [] }
        case QUESTIONS_EDIT_SUCCESS:
            return { loading: false, questions: action.payload }
        case QUESTIONS_EDIT_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const getAllQuestionsReducer = (state = { questions: [] }, action) => {
    switch(action.type) {
        case QUESTIONS_ALL_REQUEST:
            // questions is an empty array because it hasn't been fulfilled yet
            return { loading: true, questions: [] }
        case QUESTIONS_ALL_SUCCESS:
            return { loading: false, questions: action.payload }
        case QUESTIONS_ALL_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const replyQuestionReducer = (state = { questions: [] }, action) => {
    switch(action.type) {
        case QUESTIONS_REPLY_REQUEST:
            // questions is an empty array because it hasn't been fulfilled yet
            return { loading: true, questions: [] }
        case QUESTIONS_REPLY_SUCCESS:
            return { loading: false, success: true, questions: action.payload }
        case QUESTIONS_REPLY_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const commentsReducer = (state = { comments: [] }, action) => {
    switch(action.type) {
        case QUESTIONS_ALL_COMMENTS_REQUEST:
            // questions is an empty array because it hasn't been fulfilled yet
            return { loading: true, questions: [] }
        case QUESTIONS_ALL_COMMENTS_SUCCESS:
            return { loading: false, success: true, comments: action.payload }
        case QUESTIONS_ALL_COMMENTS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}