import { MESSAGE_GET_ALL_REQUEST, MESSAGE_GET_ALL_SUCCESS, MESSAGE_GET_ALL_FAIL } from '../constants/messageConstants';

export const messageAllReducer = (state = {}, action) => {
    switch(action.type) {
        case MESSAGE_GET_ALL_REQUEST:
            return {
                loading: true
            }
        case MESSAGE_GET_ALL_SUCCESS:
            return {
                loading: false,
                success: true,
                messages: action.payload
            }
        case MESSAGE_GET_ALL_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
} 