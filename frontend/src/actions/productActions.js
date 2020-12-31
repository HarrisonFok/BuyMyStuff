import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL } from "../constants/productConstants"
import axios from "axios";
// want to make an async request - redux-thunk allows you to add a function within a function

export const listProducts = () => async(dispatch) => {
    try {
        // Getting ready to send the request
        dispatch({type: PRODUCT_LIST_REQUEST});
        const {data} = await axios.get("/api/products")
        // in productReducer, when it's success, the payload will be matched to the "products" key
        dispatch({
            type: PRODUCT_LIST_SUCCESS, 
            payload: data
        })
    } catch (error) {
        // the message will get us the error message we got when we tried wrong things on postman
        // error.response.data.message is here because we have the custom middleware
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message})
    }
} 

export const listProductDetails = (id) => async(dispatch) => {
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST});
        const {data} = await axios.get(`/api/products/${id}`)
        // in productReducer, when it's success, the payload will be matched to the "products" key
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS, 
            payload: data
        })
    } catch (error) {
        // the message will get us the error message we got when we tried wrong things on postman
        dispatch({type: PRODUCT_DETAILS_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message})
    }
} 